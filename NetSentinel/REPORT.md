# NetSentinel - Network Security & Status Dashboard

**NetSentinel** is a modern Full-Stack Networking Dashboard designed to monitor network traffic, identify public IP details, and perform port scanning for security analysis.

---

## 🚀 1. Prerequisites (Download These First)

Before running the project, you must install the following two software packages on your computer.

### **1. Python (For the Backend)**
*   **What it does**: Runs the network scanning logic.
*   **Download Link**: [https://www.python.org/downloads/](https://www.python.org/downloads/)
*   **Installation Tip**: When installing, **check the box** that says "Add Python to PATH".

### **2. Node.js (For the Frontend)**
*   **What it does**: Runs the visual dashboard.
*   **Download Link**: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
*   **Installation Tip**: Download the "LTS" (Long Term Support) version and click "Next" through the installer.

---

## 🛠 2. How to Run the Project

Once you have installed Python and Node.js, follow these simple steps.

### **Step 1: Open the Project**
1.  Open your folder where `NetSentinel` is located.
2.  Open a terminal (Command Prompt or PowerShell) inside this folder.

### **Step 2: Start the Backend (Server)**
Open a terminal and run these commands:

```bash
cd NetSentinel/backend
pip install -r requirements.txt
python app.py
```
*You should see a message saying "Running on http://127.0.0.1:5000". Keep this window OPEN.*

### **Step 3: Start the Frontend (Dashboard)**
Open a **NEW** terminal window (do not close the first one) and run:

```bash
cd NetSentinel/frontend
npm install
npm run dev
```
*You will see a link like `http://localhost:5173`. Ctrl+Click it to open the dashboard in your browser.*

---

## 📚 3. Interview Cheat Sheet (Q&A)

When you put this on your resume, interviewers might ask these questions. Memorize these simple answers!

### **Q1: What is this project?**
**Answer:** "NetSentinel is a full-stack network monitoring tool. It uses a **Python Flask** backend to handle low-level networking tasks like socket connections and packet counting, and a **React.js** frontend to display this data in real-time."

### **Q2: What is a Port Scanner?**
**Answer:** "A Port Scanner checks if a specific 'door' (port) on a server is open. For example, Port 80 is for Web traffic. My tool attempts to create a socket connection to that port; if the connection succeeds (return code 0), the port is OPEN. If it fails, it is CLOSED."

### **Q3: How does the Frontend talk to the Backend?**
**Answer:** "I used REST APIs. The React frontend sends HTTP requests (GET and POST) to the Flask backend. For example, when you click 'Check Port', React sends a POST request with the target URL, and Flask returns a JSON response with the result."

### **Q4: Why did you use Threading/Async?**
**Answer:** "Network operations like scanning a port can take time (latency). By handling these asynchronously or in a separate backend process, the user interface (UI) remains responsive and doesn't freeze while waiting for a result."

---

## 🧠 4. Project Structure

*   **backend/**: Contains the Python code (`app.py`) for networking logic.
*   **frontend/**: Contains the React code (`App.jsx`) for the user interface.
*   **requirements.txt**: List of Python libraries used.
*   **package.json**: List of JavaScript libraries used.
