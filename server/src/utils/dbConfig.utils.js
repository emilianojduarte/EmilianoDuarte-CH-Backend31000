//IMPORT
import dotenv from "dotenv";
dotenv.config();

//CONFIG
export default {
  mongo: {
    connectionString: process.env.PAK_MONGO,
  },
  firebase: {
    type: "service_account",
    project_id: "eccomerce-ch31000",
    private_key_id: "2afce5e935f36452141b352218022da19a3901fd",
    private_key: process.env.PAK_FIREBASE,
    client_email:
      "firebase-adminsdk-8sd5o@eccomerce-ch31000.iam.gserviceaccount.com",
    client_id: "111089477656030643705",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-8sd5o%40eccomerce-ch31000.iam.gserviceaccount.com",
  },
};
