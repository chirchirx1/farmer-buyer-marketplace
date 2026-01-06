# Farm Management System

A comprehensive web-based platform connecting farmers and buyers while providing role-based farm management tools optimized for low-bandwidth environments.

## 🌾 Overview

This system consists of two integrated applications:

1. **FarmConnect Marketplace** - A low-bandwidth e-commerce platform connecting farmers directly with buyers
2. **AgriManage Dashboard** - A role-based farm management system with analytics and tracking

## ✨ Features

### FarmConnect Marketplace

#### For Buyers
- Browse available farm products with prices and locations
- Add products to shopping cart
- Adjust quantities and manage cart items
- **M-Pesa Payment Integration** - Mock Daraja API implementation
- Order history and transaction tracking
- Optimized for low-bandwidth areas

#### For Farmers
- List products with pricing and availability
- Track sales and transactions
- Connect with buyers directly

#### Payment System
- **STK Push Simulation** - Mimics real M-Pesa payment flow
- Enter phone number for payment
- Real-time payment status updates (Pending, Success, Failed)
- Transaction ID generation
- Payment confirmation notifications

### AgriManage Dashboard

#### Role-Based Access Control (RBAC)

**Farmer Role**
- Personal farm overview dashboard
- Crop tracking and management
- Area and yield monitoring
- Revenue and expense analytics
- Weather information
- Crop health status tracking
- Interactive charts:
  - Yield and revenue trends
  - Expense breakdown by category

**Administrator Role**
- System-wide analytics and statistics
- Farm management (view, edit, add farms)
- User management
- Performance monitoring across all farms
- Total revenue tracking
- Advisor assignment and oversight

**Advisor Role**
- Assigned farms overview
- Consultation scheduling
- Advisory tracking and status updates
- Report generation
- Recommendation management
- Farmer communication tools

## 🛠️ Technology Stack

- **Frontend Framework**: React
- **Styling**: Tailwind CSS
- **Charts**: Recharts library
- **Icons**: Lucide React
- **State Management**: React Hooks (useState)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/farm-management-system.git

# Navigate to project directory
cd farm-management-system

# Install dependencies
npm install

# Start development server
npm start
```

## 🚀 Usage

### Marketplace Application

1. **Browse Products**: View available farm products on the main marketplace page
2. **Add to Cart**: Click "Add to Cart" on desired products
3. **Checkout**: 
   - Click the cart icon in the header
   - Review items and adjust quantities
   - Enter M-Pesa phone number (format: 07XXXXXXXX)
   - Click "Pay Now" to initiate STK push
   - Wait for payment confirmation (simulated)
4. **View Orders**: Check transaction history in the "Orders" tab

### Dashboard Application

1. **Role Selection**: Use the demo switcher to change between roles:
   - Farmer
   - Administrator
   - Advisor

2. **Farmer View**:
   - Monitor crop performance on the overview dashboard
   - Track expenses and revenue
   - View detailed crop information
   - Check weather conditions

3. **Admin View**:
   - Access system-wide statistics
   - Manage registered farms
   - View performance analytics
   - Add or edit farm records

4. **Advisor View**:
   - View assigned farms
   - Schedule and track consultations
   - Create recommendations
   - Generate reports

## 🔐 Authentication & Security

**Current Implementation**: Demo mode with role switching
**Production Requirements**:
- Implement proper authentication (JWT, OAuth)
- Password hashing (bcrypt)
- Role-based middleware
- Session management
- API key security for M-Pesa integration

## 📱 Low-Bandwidth Optimization

The marketplace is specifically designed for areas with poor connectivity:

- Minimal JavaScript bundles
- Text-heavy interface with limited images
- Efficient data loading
- Progressive enhancement
- Lightweight CSS
- Fast initial load times
- Optimized for 2G/3G networks

## 💳 M-Pesa Integration

### Mock Implementation

The current implementation simulates the Safaricom Daraja API:

```javascript
// STK Push Flow
1. User enters phone number
2. System sends simulated STK push
3. 2-second delay (mimics real processing)
4. 80% success rate for demo purposes
5. Transaction ID generation
6. Payment confirmation/failure
```

### Production Integration

For production deployment with real M-Pesa:

```javascript
// Required Daraja API Credentials
- Consumer Key
- Consumer Secret
- Passkey
- Business Short Code
- Callback URL

// API Endpoints
- Authentication: /oauth/v1/generate?grant_type=client_credentials
- STK Push: /mpesa/stkpush/v1/processrequest
- Query Status: /mpesa/stkpushquery/v1/query
```

## 📊 Data Structure

### Crops
```javascript
{
  id: number,
  name: string,
  area: string,
  planted: date,
  status: string,
  health: string
}
```

### Transactions
```javascript
{
  id: string,
  amount: number,
  phone: string,
  date: datetime,
  status: string,
  items: number
}
```

### Products
```javascript
{
  id: number,
  name: string,
  farmer: string,
  price: number,
  unit: string,
  location: string
}
```

## 🔄 Future Enhancements

### Marketplace
- [ ] Real M-Pesa Daraja API integration
- [ ] Product images (with compression)
- [ ] Rating and review system
- [ ] SMS notifications for transactions
- [ ] Multi-language support (Swahili, Kikuyu)
- [ ] Offline mode with service workers

### Dashboard
- [ ] Real-time weather API integration
- [ ] IoT sensor data integration
- [ ] Mobile app version
- [ ] PDF report generation
- [ ] Email notifications
- [ ] Advanced analytics and forecasting
- [ ] Inventory management
- [ ] Multi-farm management for farmers

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Newton Chirchir 

## 🙏 Acknowledgments

- Safaricom for M-Pesa Daraja API documentation
- Recharts for data visualization components
- Tailwind CSS for responsive design
- Lucide React for icon library

## 📞 Support

For support and questions:
- Email: newtonchirchir@gmail.com
- Phone: +254 724085405
- Website: www.farmconnect.co.ke

## 🐛 Known Issues

- Mock M-Pesa has 80% success rate (intentional for demo)
- Weather data is static (requires API integration)
- No persistent storage (data resets on refresh)
- Demo role switching (production needs authentication)

## 📈 Roadmap

**Q1 2026**
- Production M-Pesa integration
- User authentication system
- Database implementation

**Q2 2026**
- Mobile applications (iOS/Android)
- SMS notification system
- Advanced reporting features

**Q3 2026**
- AI-powered crop recommendations
- Market price predictions
- IoT integration for smart farming

---

**Version**: 1.0.0  
**Last Updated**: January 2026  
**Status**: Demo/Development
