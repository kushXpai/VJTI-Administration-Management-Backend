import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IStudent extends Document {
    _id: ObjectId;
    // Personal Details
    name: string;
    dateOfBirth: Date;
    gender: "Male" | "Female" | "Other";
    mobileNumber: string;

    // Parent Details
    fatherName: string;
    fatherMobile: string;
    motherName: string;
    motherMobile: string;
    guardianName?: string;
    guardianMobile?: string;

    // MH MCA CET Details
    cetApplicationId: string;
    cetRank: string;

    // Password
    password: string; // Plain Password

    // Methods
    matchPassword: (enteredPassword: string) => boolean;
}

// Define Mongoose Schema
const StudentSchema: Schema<IStudent> = new Schema(
    {
        // Personal Details
        name: { type: String, required: true },
        dateOfBirth: { type: Date, required: true },
        gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
        mobileNumber: { type: String, required: true, match: /^\d{10}$/ },

        // Parent Details
        fatherName: { type: String, required: true },
        fatherMobile: { type: String, required: true },
        motherName: { type: String, required: true },
        motherMobile: { type: String, required: true },
        guardianName: { type: String },
        guardianMobile: { type: String },

        // MH MCA CET Details
        cetApplicationId: { type: String, required: true, unique: true },
        cetRank: { type: String, required: true },

        // Password (Plain Text)
        password: { type: String, required: true, minlength: 6 },
    },
    { timestamps: true } // Automatically adds createdAt & updatedAt fields
);

// **Method to match passwords (No hashing now)**
StudentSchema.methods.matchPassword = function (enteredPassword: string) {
    return enteredPassword === this.password; // Direct comparison
};

// Export the model
const Student = mongoose.model<IStudent>("Student", StudentSchema);
export default Student;