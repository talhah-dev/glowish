import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    number: {
        type: String,
        required: true,
        unique: true,
        match: [/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"],
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
    },

    avatar: {
        type: String, // profile image URL
        default: '',
    },

    coverImage: {
        type: String, // cover image URL
        default: '',
    },

    bio: {
        type: String,
        trim: true,
    },

    portfolio: {
        type: String,
    },

    linkedIn: {
        type: String,
    },

    instagram: {
        type: String,
    },

    facebook: {
        type: String,
    },

    xProfile: {
        type: String,
    },

    tikTok: {
        type: String,
    },

    idDocument: {
        type: String,
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    verificationCode: {
        type: String,
        default: ''
    },

    otpExpire: {
        type: Date,
        default: Date.now()
    },

    jobTitle: {
        type: String,
    },

    location: {
        type: String,
    },

    visibility: {
        type: String,
        enum: ["public", "private"],
        default: "public"
    },

    likedPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }],

    savedPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }],

    savedSurveys: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Survey',
    }],

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);