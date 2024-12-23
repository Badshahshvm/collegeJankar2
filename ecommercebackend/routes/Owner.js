const express = require("express");
const router = express.Router();
const Seller = require("../models/seller");
const User = require("../models/user");
const bcrypt = require('bcryptjs');

// Route to delete a seller
router.delete("/:sellerId", async (req, res) => {
              try {
                            // Find the seller by sellerId
                            const seller = await Seller.findById(req.params.sellerId);

                            // Retrieve the user from session
                            const userId = req.session.userId;
                            const user = await User.findById(userId);

                            // Check if the user has the 'owner' role
                            if (user.role !== 'owner') {
                                          return res.json({
                                                        success: false,
                                                        message: "Unauthorized Action"
                                          });
                            }

                            // Check if the seller exists
                            if (!seller) {
                                          return res.json({
                                                        success: false,
                                                        message: "Seller Not Found"
                                          });
                            }

                            // Delete the seller from the database
                            await Seller.findByIdAndDelete(req.params.sellerId);

                            // Respond with success message
                            return res.json({
                                          success: true,
                                          message: "Seller deleted successfully"
                            });
              } catch (err) {
                            // Handle errors
                            return res.json({
                                          success: false,
                                          message: err.message
                            });
              }
});

// Route to create a seller
router.post("/create-seller", async (req, res) => {
              try {
                            // Retrieve the user from session
                            const userId = req.session.userId;
                            const user = await User.findById(userId);

                            // Check if the user has the 'owner' role
                            if (user.role !== 'owner') {
                                          return res.json({
                                                        success: false,
                                                        message: "Unauthorized Action"
                                          });
                            }

                            // Destructure required fields from the request body
                            const { phoneNumber, emailId, password, name, businessName, businessAddress, businessType } = req.body;

                            // Check if seller already exists
                            const existingSeller = await Seller.findOne({ email: emailId });
                            if (existingSeller) {
                                          return res.status(400).json({ error: 'Seller already exists' });
                            }

                            // Generate unique seller ID (MBSLR + 5 digits)
                            let sellerId;
                            let isUnique = false;
                            while (!isUnique) {
                                          const randomNum = Math.floor(10000 + Math.random() * 90000);
                                          sellerId = `MBSLR${randomNum}`;
                                          const existingId = await Seller.findOne({ sellerId });
                                          if (!existingId) isUnique = true;
                            }

                            // Hash the password before saving
                            const hashedPassword = await bcrypt.hash(password, 10);

                            // Create new seller object
                            const seller = new Seller({
                                          name,
                                          phoneNumber,
                                          email: emailId,
                                          password: hashedPassword, // Save hashed password
                                          sellerId,
                                          businessName,
                                          businessAddress,
                                          businessType,
                                          emailVerified: false, // Set email verification status
                                          phoneVerified: false, // Set phone verification status
                            });

                            // Save the seller to the database
                            await seller.save();

                            // Store sellerId in session for future reference
                            req.session.sellerId = sellerId;

                            // Respond with success
                            res.status(201).json({
                                          success: true,
                                          message: 'Seller registered successfully',
                                          sellerId
                            });
              } catch (err) {
                            res.json({
                                          success: false,
                                          message: err.message
                            });
              }
});

// Route to get all sellers
router.get("/all-sellers", async (req, res) => {
              try {
                            // Retrieve the user from session
                            const userId = req.session.userId;
                            const user = await User.findById(userId);

                            // Check if the user has the 'owner' role
                            if (user.role !== 'owner') {
                                          return res.json({
                                                        success: false,
                                                        message: "Unauthorized Action"
                                          });
                            }

                            // Fetch all sellers from the database
                            const sellers = await Seller.find();

                            // Respond with the list of sellers
                            return res.json({
                                          success: true,
                                          sellers
                            });
              } catch (err) {
                            res.json({
                                          success: false,
                                          message: err.message
                            });
              }
});

module.exports = router;
