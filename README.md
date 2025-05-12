# 🗳️ RTVP - Real Time Voting Platform

> A modern, real-time voting platform that brings democracy to your fingertips!

---

![RTVP Preview](https://img.enacton.com/ShareX/2025/05/cbh1icDjx6.png)
![RTVP Preview](https://img.enacton.com/ShareX/2025/05/uhaflaTRIs.png)

## 🤔 What is RTVP?

RTVP (Real Time Voting Platform) is a cutting-edge web application that revolutionizes the way we gather opinions. With instant updates and a sleek interface, it's perfect for everything from team decisions to community surveys!

## ✨ Features

### Core Features

- 🚀 **Real-time Updates** - See votes as they come in with WebSocket technology
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Intuitive Interface** - Clean, modern UI that anyone can use
- 📊 **Dynamic Visualizations** - Beautiful word clouds to display results
- 🔐 **Secure Voting** - Ensures fair and transparent voting processes

### Advanced Features

- 👥 **Anonymous & Authenticated Voting** - Support for both public and private polls
- 📈 **Real-time Analytics** - Track voting patterns and participation rates
- 🎯 **Multiple Answer Support** - Create single or multiple answer polls
- 🌐 **Share Links** - Easy sharing with unique poll URLs

## 🛠️ Tech Stack

### Frontend

- **Framework:** Next.js 15
- **Language:** JavaScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI
- **State Management:** TanStack React Query
- **Real-time:** Socket.io-client
- **Data Visualization:** Visx/Wordcloud
- **Database Client:** Upstash Redis

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Real-time:** Socket.io
- **Database:** Redis (via ioredis)

## 🚀 Getting Started

### Prerequisites

- Node.js (v22.0.0 or higher)
- pnpm (or npm/yarn)
- Redis server (cloud)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Yash-Tibadiya/RTVP.git
   cd RTVP/client
   cd RTVP/server
   ```

2. **Install dependencies In Both**

   ```bash
   pnpm install
   ```

3. **Run the development server in Both**

   ```bash
   pnpm run dev
   ```

4. **Open the application**

   ### In `RTVP\client\src\app\[topic]\ClientPage.tsx` change

   - `const socket = io("https://localhost:8080");`

   &&

   - `` navigator.clipboard.writeText(`https://localhost:3000/${topicName}`); ``

   ### In `RTVP\server\index.ts`

   - origin: ["https://localhost:3000"],

   ### Then

   - Navigate to [http://localhost:3000](http://localhost:3000) in your browser

## 📖 Usage

### Creating a Room

1. Enter your `Topic name`
2. Click on `Create` button
3. Share the generated link with participants

### Voting

1. Access the poll through the shared link
2. Submit your thoughts
3. Watch real-time results update instantly

## 🤝 Contributing

We love contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 📝 Coding Standards

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 🐛 Bug Reports & Feature Requests

Found a bug or have a great idea? Please [open an issue](https://github.com/Yash-Tibadiya/RTVP/issues) with:

- Clear description
- Steps to reproduce (for bugs)
- Expected behavior
- Screenshots (if applicable)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Yash Tibadiya**

- GitHub: [@Yash-Tibadiya](https://github.com/Yash-Tibadiya)
- Email: tibadiyayash@gmail.com
