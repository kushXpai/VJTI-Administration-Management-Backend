import mongoose, { Schema, Document } from "mongoose";


export interface IStudent extends Document {
    // Personal Details
    name: string;
    dateOfBirth: string;
    gender: string;
    mobileNumber: string;

    // Parent Details
    fatherName: string;
    fatherMobile: string;
    motherName: string;
    motherMobile: string;
    guardianName?: string;
    guardianMobile?: string;

    // Address Details
    presentAddressLine1: string;
    presentAddressLine2?: string;
    presentState: string;
    presentCity: string;
    presentPinCode: string;
    permanentAddressLine1: string;
    permanentAddressLine2?: string;
    permanentState: string;
    permanentCity: string;
    permanentPinCode: string;

    // MH MCA CET Details
    cetApplicationId: string;
    cetRank: string;

    // Admission Details
    category: string;
    admissionCategory: string;
    pwdCategory: string;
    religiousMinority: string;
    ewsStatus: boolean;
    orphanStatus: boolean;
    mhmcacetId: string;
    stateMeritNumber: string;
    feesPaid: string;

    // File Uploads (Store file paths or URLs)
    admissionReceipt: string; // File path or URL
    feesReceipt: string; // File path or URL
    aadharCard: string; // File path or URL
    aadharNumber: string;
}

// Define Mongoose Schema
const StudentSchema: Schema = new Schema(
    {
        // Personal Details
        name: { type: String, required: true },
        dateOfBirth: { type: String, required: true },
        gender: { type: String, required: true },
        mobileNumber: { type: String, required: true },

        // Parent Details
        fatherName: { type: String, required: true },
        fatherMobile: { type: String, required: true },
        motherName: { type: String, required: true },
        motherMobile: { type: String, required: true },
        guardianName: { type: String },
        guardianMobile: { type: String },

        // Address Details
        presentAddressLine1: { type: String, required: true },
        presentAddressLine2: { type: String },
        presentState: { type: String, required: true },
        presentCity: { type: String, required: true },
        presentPinCode: { type: String, required: true },
        permanentAddressLine1: { type: String, required: true },
        permanentAddressLine2: { type: String },
        permanentState: { type: String, required: true },
        permanentCity: { type: String, required: true },
        permanentPinCode: { type: String, required: true },

        // MH MCA CET Details
        cetApplicationId: { type: String, required: true },
        cetRank: { type: String, required: true },

        // Admission Details
        category: { type: String, required: true },
        admissionCategory: { type: String, required: true },
        pwdCategory: { type: String, required: true },
        religiousMinority: { type: String, required: true },
        ewsStatus: { type: Boolean, required: true },
        orphanStatus: { type: Boolean, required: true },
        mhmcacetId: { type: String, required: true },
        stateMeritNumber: { type: String, required: true },
        feesPaid: { type: String, required: true },

        // File Uploads (Store file paths or URLs)
        admissionReceipt: { type: String, required: true }, // e.g., "/uploads/admission_receipt.pdf"
        feesReceipt: { type: String, required: true }, // e.g., "/uploads/fees_receipt.jpg"
        aadharCard: { type: String, required: true }, // e.g., "/uploads/aadhar_card.png"
        aadharNumber: { type: String, required: true },
    },
    { timestamps: true } // Automatically adds createdAt & updatedAt fields
);

// Export the model
const Student = mongoose.model<IStudent>("Student", StudentSchema);
export default Student;
