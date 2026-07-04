import supabase from "../config/supabase.js";

// GET ALL MODELS
export const getModels = async (req, res) => {
  const { data, error } = await supabase
    .from("models")
    .select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
};

// UPDATE MODEL
export const updateModel = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category } = req.body;

    const { data, error } = await supabase
      .from("models")
      .update({
        name,
        description,
        category,
      })
      .eq("id", id)
      .select();

    if (error) {
      return res.status(500).json({
        error: error.message,
      });
    }

    res.json({
      message: "Model updated successfully!",
      data,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// DELETE MODEL
export const deleteModel = async (req, res) => {
  const { id } = req.params;

  try {
    const { data: model, error: fetchError } = await supabase
      .from("models")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError) {
      return res.status(500).json({ error: fetchError.message });
    }

    const fileName = model.model_url.split("/").pop();

    const { error: storageError } = await supabase.storage
      .from("models")
      .remove([fileName]);

    if (storageError) {
      return res.status(500).json({ error: storageError.message });
    }

    const { error: dbError } = await supabase
      .from("models")
      .delete()
      .eq("id", id);

    if (dbError) {
      return res.status(500).json({ error: dbError.message });
    }

    res.json({
      message: "Model deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// UPLOAD MODEL
export const uploadModel = async (req, res) => {
  try {
    const { name, description, category } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "Please upload a GLB file.",
      });
    }

    const fileName = `${Date.now()}-${file.originalname}`;

    const { error: uploadError } = await supabase.storage
      .from("models")
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
      });

    if (uploadError) {
      return res.status(500).json({
        error: uploadError.message,
      });
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("models")
      .getPublicUrl(fileName);

    const { data, error } = await supabase
      .from("models")
      .insert([
        {
          name,
          description,
          category,
          model_url: publicUrl,
        },
      ])
      .select();

    if (error) {
      return res.status(500).json({
        error: error.message,
      });
    }

    res.status(201).json({
      message: "Model uploaded successfully!",
      data,
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};