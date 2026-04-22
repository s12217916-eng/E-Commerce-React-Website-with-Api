const express = require('express');
const router = express.Router();

// 1. ثغرة أمنية خطيرة: استخدام Eval (Code Injection)
function executeCommand(userInput) {
    return eval(userInput); 
}

// 2. ثغرة استخدام كلمة مرور ثابتة (Hardcoded Secret)
const API_KEY = "12345-ABCDE-SECRET-KEY";

router.get('/user-data', (req, res) => {
    const userId = req.query.id;

    // 3. ثغرة SQL Injection (إدخال بيانات مباشرة في الاستعلام)
    const query = "SELECT * FROM users WHERE id = " + userId;
    
    // محاكاة الاتصال بالقاعدة
    console.log(`Executing query: ${query}`);
    
    res.send("User data fetched!");
});

// 4. مشكلة في الجودة: متغيرات غير مستخدمة (Unused Variables)
const unusedVar = "I am not used anywhere";

// 5. ممارسات برمجية سيئة (Possible Memory Leak)
global.leakyArray = [];
setInterval(() => {
    global.leakyArray.push(new Array(1000).fill('leak'));
}, 100);

module.exports = router;