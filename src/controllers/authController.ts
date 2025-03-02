import { Request, Response } from "express";
import Student from "../models/Student";
import generateToken from "../utils/generateToken";

// 🔵 Register Student (Without Hashing)
export const registerStudent = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('📌 Registering Student...');

        const {
            name, dateOfBirth, gender, mobileNumber, fatherName, fatherMobile, motherName, motherMobile,
            guardianName, guardianMobile, cetApplicationId, cetRank, createPassword, confirmPassword
        } = req.body;

        // 🛑 Password Match Check
        if (createPassword !== confirmPassword) {
            res.status(400).json({ message: "Passwords do not match" });
            return;
        }

        // 🔍 Check if student already exists
        const existingStudent = await Student.findOne({ cetApplicationId });
        if (existingStudent) {
            res.status(400).json({ message: "A student with this CET Application ID already exists" });
            return;
        }

        // ✅ Store password as plain text (REMOVED HASHING)
        const newStudent = new Student({
            name,
            dateOfBirth,
            gender,
            mobileNumber,
            fatherName,
            fatherMobile,
            motherName,
            motherMobile,
            guardianName: guardianName || "",
            guardianMobile: guardianMobile || "",
            cetApplicationId,
            cetRank,
            password: createPassword, // ⚠️ Plain text password (Security Risk)
        });

        await newStudent.save();
        console.log("✅ Student Registered Successfully:", newStudent);

        res.status(201).json({ message: "Student registered successfully!" });

    } catch (error: unknown) {
        const err = error as Error;
        console.error("❌ Registration error:", err);
        res.status(500).json({ message: err.message });
    }
};


// 🔵 Login Student (Without Hashing)
export const loginStudent = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("📌 Login Attempt:", req.body);

        const { cetApplicationId, password } = req.body;

        const student = await Student.findOne({ cetApplicationId });

        if (!student) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        // 🛑 DEBUG: Log Passwords
        console.log("✅ Student found:", student);
        console.log("🔍 Entered Password:", password);
        console.log("🔍 Password in DB:", student.password);

        // 🔑 Direct string comparison (REMOVED bcrypt)
        if (password !== student.password) {
            console.log("❌ Incorrect password");
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        console.log("✅ Password Match");

        // 🎟 Generate Token
        const token = generateToken(student._id.toString());

        res.json({
            _id: student._id.toString(),
            name: student.name,
            cetApplicationId: student.cetApplicationId,
            token,
        });

    } catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};