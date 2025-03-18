import mongoose , {Schema,Document} from "mongoose";


export interface IUser extends Document {
    username: string;
    email: string;
    password: string; // Store hashed passwords in production
    deviceInfo: {
      userAgent: string;
      isMobile: boolean;
      isTablet: boolean;
      isDesktop: boolean;
      browser: string;
      platform: string;
      screenResolution: string;
    };
    ipAddress: string;
    location: {
      city: string;
      region: string;
      country: string;
      postal: string;
    };
    createdAt: Date;
  }
// Define userSchema
const userSchema = new Schema({
    username:{
        type:String,
        required:true,
    },
    login:{
        type: String,
        required: true, 
        unique: true, 
        lowercase: true,
        trim: true,   
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
    },
    deviceInfo: {
        userAgent: String,
        isMobile: Boolean,
        isTablet: Boolean,
        isDesktop: Boolean,
        browser: String,
        platform: String,
        screenResolution: String,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    ipAddress:{
        type:String
    },
    location: {
        city: String,
        region: String,
        country: String,
        postal: String,
      },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set to the current date
    },

});

// Export the model
const User = mongoose.model("user", userSchema);
export default User;