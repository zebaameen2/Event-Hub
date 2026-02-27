// const express = require("express");
// const multer = require("multer");
// const router = express.Router();
// const supabase = require("../supabaseClient");

// // Multer memory storage
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// /* =====================================================
//    ✅ CREATE EVENT
// ===================================================== */
// router.post(
//   "/",
//   upload.fields([
//     { name: "banner", maxCount: 1 },
//     { name: "card", maxCount: 1 },
//   ]),
//   async (req, res) => {
//     try {
//       const {
//         eventname,
//         description,
//         hostname,
//         eventdate,
//         email,
//         country,
//         address,
//         city,
//         state,
//         postal,
//         audience,
//         type,
//         attendees,
//         price,
//         tech,
//         agenda,
//         twitter,
//         website,
//         linkedin,
//         instagram,
//         created_by, // 👈 VERY IMPORTANT
//       } = req.body;

//       const approval = req.body.approval === "true";
//       const sponsors = JSON.parse(req.body.sponsors || "[]");

//       let banner_url = null;
//       let card_url = null;

//       /* ========= Upload Banner ========= */
//       if (req.files?.banner?.length) {
//         const file = req.files.banner[0];
//         const fileName = `banner_${Date.now()}_${file.originalname}`;

//         const { error } = await supabase.storage
//           .from("events")
//           .upload(fileName, file.buffer, {
//             contentType: file.mimetype,
//           });

//         if (error) throw error;

//         banner_url = supabase.storage
//           .from("events")
//           .getPublicUrl(fileName).data.publicUrl;
//       }

//       /* ========= Upload Card ========= */
//       if (req.files?.card?.length) {
//         const file = req.files.card[0];
//         const fileName = `card_${Date.now()}_${file.originalname}`;

//         const { error } = await supabase.storage
//           .from("events")
//           .upload(fileName, file.buffer, {
//             contentType: file.mimetype,
//           });

//         if (error) throw error;

//         card_url = supabase.storage
//           .from("events")
//           .getPublicUrl(fileName).data.publicUrl;
//       }

//       /* ========= Insert Into DB ========= */
//       const { data, error } = await supabase
//         .from("events")
//         .insert([
//           {
//             eventname,
//             description,
//             hostname,
//             eventdate,
//             email,
//             country,
//             address,
//             city,
//             state,
//             postal,
//             audience,
//             type,
//             attendees: attendees ? parseInt(attendees) : null,
//             price: price ? parseFloat(price) : null,
//             tech,
//             agenda,
//             twitter,
//             website,
//             linkedin,
//             instagram,
//             approval,
//             sponsors,
//             banner_url,
//             card_url,
//             created_by, // 👈 SAVE USER ID
//           },
//         ])
//         .select()
//         .single();

//       if (error) throw error;

//       res.json({ success: true, event: data });
//     } catch (err) {
//       console.error("CREATE ERROR:", err);
//       res.status(500).json({
//         success: false,
//         message: err.message,
//       });
//     }
//   }
// );

// /* =====================================================
//    ✅ GET ALL EVENTS
// ===================================================== */
// router.get("/", async (req, res) => {
//   try {
//     const { data, error } = await supabase
//       .from("events")
//       .select("*")
//       .order("created_at", { ascending: false });

//     if (error) throw error;

//     res.json({ success: true, events: data });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });

// /* =====================================================
//    ✅ GET MY EVENTS
// ===================================================== */
// router.get("/my/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const { data, error } = await supabase
//       .from("events")
//       .select("*")
//       .eq("created_by", userId)
//       .order("created_at", { ascending: false });

//     if (error) throw error;

//     res.json({ success: true, events: data });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });

// /* =====================================================
//    ✅ GET SINGLE EVENT
// ===================================================== */
// router.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const { data, error } = await supabase
//       .from("events")
//       .select("*")
//       .eq("id", id)
//       .single();

//     if (error) throw error;

//     res.json({ success: true, event: data });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });

// module.exports = router;








































const express = require("express");
const multer = require("multer");
const router = express.Router();
const supabase = require("../supabaseClient");
const authMiddleware = require("../middleware/authMiddleware");

// Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

/* =====================================================
   ✅ CREATE EVENT (PROTECTED)
===================================================== */
router.post(
  "/",
  authMiddleware,
  upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "card", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        eventname,
        description,
        hostname,
        eventdate,
        email,
        country,
        address,
        city,
        state,
        postal,
        audience,
        type,
        attendees,
        price,
        tech,
        agenda,
        twitter,
        website,
        linkedin,
        instagram,
      } = req.body;

      const approval = req.body.approval === "true";
      const sponsors = JSON.parse(req.body.sponsors || "[]");

      let banner_url = null;
      let card_url = null;

      /* ========= Upload Banner ========= */
      if (req.files?.banner?.length) {
        const file = req.files.banner[0];
        const fileName = `banner_${Date.now()}_${file.originalname}`;

        const { error } = await supabase.storage
          .from("events")
          .upload(fileName, file.buffer, {
            contentType: file.mimetype,
          });

        if (error) throw error;

        banner_url = supabase.storage
          .from("events")
          .getPublicUrl(fileName).data.publicUrl;
      }

      /* ========= Upload Card ========= */
      if (req.files?.card?.length) {
        const file = req.files.card[0];
        const fileName = `card_${Date.now()}_${file.originalname}`;

        const { error } = await supabase.storage
          .from("events")
          .upload(fileName, file.buffer, {
            contentType: file.mimetype,
          });

        if (error) throw error;

        card_url = supabase.storage
          .from("events")
          .getPublicUrl(fileName).data.publicUrl;
      }

      /* ========= Insert Into DB ========= */
      const { data, error } = await supabase
        .from("events")
        .insert([
          {
            eventname,
            description,
            hostname,
            eventdate,
            email,
            country,
            address,
            city,
            state,
            postal,
            audience,
            type,
            attendees: attendees ? parseInt(attendees) : null,
            price: price ? parseFloat(price) : null,
            tech,
            agenda,
            twitter,
            website,
            linkedin,
            instagram,
            approval,
            sponsors,
            banner_url,
            card_url,
            created_by: req.user.id, // 🔐 SECURE
          },
        ])
        .select()
        .single();

      if (error) throw error;

      res.json({ success: true, event: data });
    } catch (err) {
      console.error("CREATE ERROR:", err);
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
);

/* =====================================================
   ✅ GET ALL EVENTS (PUBLIC)
===================================================== */
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json({ success: true, events: data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

/* =====================================================
   ✅ GET MY EVENTS (PROTECTED)
===================================================== */
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("created_by", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json({ success: true, events: data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

/* =====================================================
   ✅ GET EVENT + REGISTRATIONS (PROTECTED)
===================================================== */
// router.get("/:id/registrations", authMiddleware, async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Registrations for this event
//     const { data: regs, error: regError } = await supabase
//       .from("registrations")
//       .select("*")
//       .eq("event_id", id);

//     if (regError) throw regError;

//     // Event info
//     const { data: event, error: eventError } = await supabase
//       .from("events")
//       .select("*")
//       .eq("id", id)
//       .single();

//     if (eventError) throw eventError;

//     res.json({
//       success: true,
//       registrations: regs || [],
//       event: event || null,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });




// registrations route
router.get("/api/events/:id/registrations", async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("registrations")
      .select("id, confirm, users(name, email)") // join users table
      .eq("event_id", id);

    if (error) return res.status(500).json({ success: false, error: error.message });

    const { data: eventData } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single();

    res.json({ success: true, registrations: data, event: eventData });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});




/* =====================================================
   ✅ GET SINGLE EVENT (PUBLIC)
===================================================== */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    res.json({ success: true, event: data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;