const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello Jenish! 🚀 9000Your GitOps Node.js App is running on Kubernetes via ArgoCD.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Node.js app running on port ${PORT}`);
});
