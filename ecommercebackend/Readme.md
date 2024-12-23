Here is the README content for documenting the implementations in the repository:

Features Implemented by Me

1. Product Image Uploading
   Enabled the ability to upload 4-5 images for each product.
   Used the Cloudinary library to handle file uploads in the backend.
   Images are stored in the /temp directory and their paths are saved in the database.
   Sellers can upload multiple images while adding new products.
   Implementation Details
   Product Model: Added an images field (array) to store multiple image URLs.
   Endpoint:
   POST /add-product - Allows sellers to upload product images and add product details.
   DELETE /remove-product/:id - Enables sellers to delete existing products.
2. Seller Dashboard Management
   Ensured that the website owner (admin) has the proper rights to manage sellers and their dashboards.
   Admin can:
   View all sellers.
   Remove any seller from the platform.
   Implementation Details
   Endpoints:
   GET /all-sellers - Fetches all registered sellers.
   DELETE /remove-seller/:id - Allows the admin to remove a specific seller.
3. Add/Remove Products
   Sellers can add new products to their dashboard.
   Sellers can also remove existing products if necessary.
   Implementation Details
   Endpoints:
   POST /add-product - Allows sellers to add new products (with multiple images and a description).
   DELETE /remove-product/:id - Enables sellers to delete specific products.
4. Seller/Website Owner Verification
   Implemented email verification for both sellers and website owners.
   When a new user registers (either seller or admin), a verification email is sent to their registered email address.
   Verification ensures only authorized individuals can access the platform.
   Implementation Details
   Used NodeMailer to send email verification links.
   Created reusable functions for sending verification emails.
   Verification routes:
   /verify-email - Confirms the email address using a token-based mechanism.
5. Coupon Code System
   Developed a complete coupon code management system.
   Admin can create, verify, and delete coupon codes.
   Users receive email notifications for:
   New coupons available.
   Expired coupons.
   Implementation Details
   Coupon Model: Added fields for code and discountPercentage.
   Endpoints:
   GET /get-coupon - Fetches all available coupons.
   POST /save-coupon - Allows admin to create new coupons.
   POST /verify-coupon - Verifies if a coupon code is valid.
   DELETE /delete-coupon - Deletes an existing coupon code and notifies users.
6. Shipping API Integration
   Integrated the Shiprocket API for managing shipping and logistics.
   Features include:
   Creating a shipping order.
   Tracking shipment status.
   Implementation Details
   Used Axios for making API calls to Shiprocket.
   Endpoints:
   POST /create-shipment - Creates a shipping order using Shiprocket's API.
   GET /track-shipment/:shipment_id - Tracks the shipment status based on the shipment_id.
7. Product Description
   Enabled sellers to add detailed descriptions for their products during product creation or update.
   Descriptions provide buyers with complete information about the product.
   Implementation Details
   Product Model: Added a description field to store detailed information.
   Endpoints:
   POST /add-product - Allows sellers to include descriptions when adding new products.
