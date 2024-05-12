const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
var stdNo = 0;

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, ref, set, get, child, equalTo } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyBIzWLTJDvKxaPZ00rPK5sc-telSGGccQw",
    authDomain: "login-signup-data-a04a7.firebaseapp.com",
    databaseURL: "https://login-signup-data-a04a7-default-rtdb.firebaseio.com",
    projectId: "login-signup-data-a04a7",
    storageBucket: "login-signup-data-a04a7.appspot.com",
    messagingSenderId: "1096412486133",
    appId: "1:1096412486133:web:f7bc62e0f9e79acd5728bc",
    measurementId: "G-45RYZ72W8J"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
// Đăng ký
document.getElementById("signup-button").addEventListener("click", function(e){
    e.preventDefault();
    const name = document.getElementById("signup-name").value; // Sử dụng tên người dùng làm đường dẫn
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    // Lưu dữ liệu vào Firebase 
    set(ref(db, 'user/' + name), { // Sử dụng tên người dùng làm đường dẫn
        name: name,
        email: email,
        password: password
    }).then(() => {
        alert("Registration Successful");
        container.classList.remove("active"); // Sau khi đăng ký thành công, ẩn form đăng ký
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
});
// Đăng nhập
document.getElementById("signin-button").addEventListener("click", function(e){
    e.preventDefault();
    const name = document.getElementById("signin-name").value;
    const password = document.getElementById("signin-password").value;
    
    // Kiểm tra đăng nhập bằng cách truy vấn vào Firebase
    const usersRef = ref(db, 'user');
    get(child(usersRef, name)).then((snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            if (userData.password === password) {
                const SIdata = {
                    user: userData.name,
                    userpass: userData.password,
                }

                fetch('http://localhost:3000/IsSignIn', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(SIdata)
                })  
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    alert("Login Successful");
                    // Chuyển hướng sang trang index.html
                    window.location.href = "./index.html";
                })
                .catch(error => {
                    console.error('There has been a problem with your fetch operation:', error);
                });
            } else {
                alert("Invalid password");
            }
        } else {
            // Hiển thị thông báo và gợi ý đăng ký tài khoản nếu tài khoản không tồn tại
            alert("User not found. Please sign up for an account.");
            container.classList.add("active"); // Hiển thị form đăng ký
        }
    }).catch((error) => {
        console.error("Error getting document:", error);
    });



});

/*
fetch("https://jsonplaceholder.typicode.com/todos", {
  method: "POST",
  body: JSON.stringify({
    userId: 1,
    title: "Fix my bugs",
    completed: false
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then((response) => response.json())
  .then((json) => console.log(json));
*/