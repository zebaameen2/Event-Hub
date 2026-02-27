import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { supabase } from "../supabaseClient.js"; // 👈 apna Supabase client import karo

const router = express.Router();

// Accept registration
router.put("/:id/accept", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("registrations")
      .update({ confirm: "accept" })
      .eq("id", id);

    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }

    res.json({ success: true, message: "Registration accepted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Reject registration
router.put("/:id/reject", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("registrations")
      .update({ confirm: "reject" })
      .eq("id", id);

    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }

    res.json({ success: true, message: "Registration rejected" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
