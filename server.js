const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "127.0.0.1",  // use IPv4 explicitly
    user: "root",
    password: "Sumit@123",
    database: "find_a_worker",
    port: 3306 // ✅ MySQL default port
});


db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("MySQL Connected...");

    // Server start karna tabhi jab DB connected ho jaye
    app.listen(5000, () => {
        console.log("Server running on port 5000");
    });
});


// User Registration API
app.post("/register", async (req, res) => {
    const { full_name, email, password, user_type } = req.body;

    if (!full_name || !email || !password || !user_type) {
        return res.status(400).json({ message: "Sab fields required hain" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = "INSERT INTO users (full_name, email, password_hash, user_type) VALUES (?, ?, ?, ?)";
        db.query(sql, [full_name, email, hashedPassword, user_type], (err, result) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(409).json({ message: "Email already registered" });
                }
                console.error(err);
                return res.status(500).json({ message: "Server error" });
            }
            res.status(201).json({ message: "User registered successfully" });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// User Login API
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email aur password dono chahiye" });
    }

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).json({ message: "Server error", error: err });
        if (results.length === 0) return res.status(401).json({ message: "User not found" });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        res.json({
            message: "Login successful",
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                user_type: user.user_type
            }
        });
    });
});

app.post("/worker_profile", (req, res) => {
    const { user_id, service_category, location, phone_number, about_me, experience_years, profile_image_url } = req.body;

    if (!user_id || !service_category || !location || !phone_number) {
        return res.status(400).json({ message: "Required fields missing" });
    }

    const sql = `
        INSERT INTO worker_profiles 
        (user_id, service_category, location, phone_number, about_me, experience_years, profile_image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [user_id, service_category, location, phone_number, about_me || null, experience_years || null, profile_image_url || null], (err, result) => {
        if (err) {
            console.error("Worker profile insert error:", err);
            return res.status(500).json({ message: "Server error" });
        }
        res.status(201).json({ message: "Worker profile created successfully", profile_id: result.insertId });
    });

});
