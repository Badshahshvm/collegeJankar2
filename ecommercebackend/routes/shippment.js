const express = require("express")
const axios = require('axios');
const router = express.Router();
const authenticateShiprocket = async () => {
              try {
                            const response = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
                                          email: 'your-email@example.com',
                                          password: 'your-password',
                            });

                            return response.data.token; // Returns the JWT token
              } catch (error) {
                            console.error('Error authenticating with Shiprocket:', error.response.data);
                            throw new Error('Failed to authenticate');
              }
};
router.post("/new", async () => {
              try {
                            const response = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
                                          email: 'your-email@example.com',
                                          password: 'your-password',
                            });

                            return response.data.token; // Returns the JWT token
              } catch (error) {
                            console.error('Error authenticating with Shiprocket:', error.response.data);
                            throw new Error('Failed to authenticate');
              }
})

router.post("/order", async (orderDetails) => {
              const token = await authenticateShiprocket();

              try {
                            const response = await axios.post(
                                          'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc',
                                          orderDetails,
                                          {
                                                        headers: { Authorization: `Bearer ${token}` },
                                          }
                            );

                            return response.data; // Returns order creation response
              } catch (error) {
                            console.error('Error creating order:', error.response.data);
                            throw new Error('Failed to create order');
              }
})

router.get("/track-shipment/:shipmentId", async (shipmentId) => {
              const token = await authenticateShiprocket();

              try {
                            const response = await axios.get(
                                          `https://apiv2.shiprocket.in/v1/external/courier/track?shipment_id=${shipmentId}`,
                                          {
                                                        headers: { Authorization: `Bearer ${token}` },
                                          }
                            );

                            return response.data; // Returns tracking information
              } catch (error) {
                            console.error('Error tracking shipment:', error.response.data);
                            throw new Error('Failed to track shipment');
              }
})

router.get("/shipping/details", async (pickupPin, deliveryPin, weight) => {
              const token = await authenticateShiprocket();

              try {
                            const response = await axios.get(
                                          `https://apiv2.shiprocket.in/v1/external/courier/serviceability/?pickup_postcode=${pickupPin}&delivery_postcode=${deliveryPin}&cod=1&weight=${weight}`,
                                          {
                                                        headers: { Authorization: `Bearer ${token}` },
                                          }
                            );

                            return response.data;
              } catch (error) {
                            console.error('Error fetching courier services:', error.response.data);
                            throw new Error('Failed to fetch courier services');
              }
})
module.exports = router