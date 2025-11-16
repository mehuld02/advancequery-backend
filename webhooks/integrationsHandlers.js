import axios from "axios";

// WHATSAPP WEBHOOK
export const whatsappWebhook = async (req, res) => {
  try {
    const msg = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    if (!msg) return res.sendStatus(200);

    await axios.post("http://localhost:5000/api/queries/add", {
      customerName: msg.from,
      message: msg.text?.body || "",
      platform: "whatsapp",
      platformId: msg.from,
    });

    await axios.post("http://localhost:5000/api/queries/add", {
      customerName: msg.from,
      message: msg.text?.body || "",
      platform: "instagram",
      platformId: msg.from,
    });


    await axios.post("http://localhost:5000/api/queries/add", {
      customerName: msg.from,
      message: msg.text?.body || "",
      platform: "facebook",
      platformId: msg.from,
    });


    await axios.post("http://localhost:5000/api/queries/add", {
      customerName: msg.from,
      message: msg.text?.body || "",
      platform: "twitter",
      platformId: msg.from,
    });


    await axios.post("http://localhost:5000/api/queries/add", {
      customerName: msg.from,
      message: msg.text?.body || "",
      platform: "email",
      platformId: msg.from,
    });



    res.sendStatus(200);
  } catch (err) {
    console.log("WhatsApp Error:", err);
    res.sendStatus(500);
  }
};

// META (Instagram + Facebook Messenger)
export const metaWebhook = async (req, res) => {
  try {
    const entry = req.body.entry?.[0]?.messaging?.[0];
    if (!entry) return res.sendStatus(200);

    await axios.post("http://localhost:5000/api/queries/add", {
      customerName: entry.sender.id,
      message: entry.message?.text || "",
    });

    res.sendStatus(200);
  } catch (err) {
    console.log("Meta Error:", err);
    res.sendStatus(500);
  }
};

// TWITTER DM
export const twitterWebhook = async (req, res) => {
  try {
    const dm = req.body.direct_message_events?.[0]?.message_create;
    if (!dm) return res.sendStatus(200);

    await axios.post("http://localhost:5000/api/queries/add", {
      customerName: dm.sender_id,
      message: dm.message_data.text,
    });

    res.sendStatus(200);
  } catch (err) {
    console.log("Twitter Error:", err);
    res.sendStatus(500);
  }
};

// EMAIL
export const emailWebhook = async (req, res) => {
  try {
    const { from, subject, body } = req.body;

    await axios.post("http://localhost:5000/api/queries/add", {
      customerName: from,
      message: `${subject}\n\n${body}`,
    });

    res.sendStatus(200);
  } catch (err) {
    console.log("Email Error:", err);
    res.sendStatus(500);
  }
};

// WEBSITE CHAT / APP CHAT
export const chatWebhook = async (req, res) => {
  try {
    const { name, text } = req.body;

    await axios.post("http://localhost:5000/api/queries/add", {
      customerName: name,
      message: text,
    });

    res.sendStatus(200);
  } catch (err) {
    console.log("Chat Error:", err);
    res.sendStatus(500);
  }
};
