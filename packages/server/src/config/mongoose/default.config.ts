//TODO change database name from detualt to wonted as Bratislava
export default {
  id: "default",
  url: process.env.DEFAULT_URL || "mongodb://localhost:27017/default",
  connectionOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
};
