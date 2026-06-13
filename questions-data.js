const QUESTION_SECTIONS = [
  {
    "id": "true-false",
    "title": "صح أو خطأ",
    "instruction": "أجب بصح أو خطأ، مع تصحيح العبارة الخاطئة:",
    "items": [
      {
        "id": "true-false-1",
        "number": 1,
        "body": "نستخدم الرمز `\\t` للانتقال إلى سطر جديد.",
        "answer": {
          "verdict": "خطأ",
          "correction": "الرمز `\\n` للانتقال إلى سطر جديد، والرمز `\\t` لمسافة جدولية أفقية."
        }
      },
      {
        "id": "true-false-2",
        "number": 2,
        "body": "التعليمة التالية تستخدم للتصريح عن متحول عشري:\n\n   ```cpp\n   bool x;\n   ```",
        "answer": {
          "verdict": "خطأ",
          "correction": "للتصريح عن متحول عشري نستخدم `float` أو `double`."
        }
      },
      {
        "id": "true-false-3",
        "number": 3,
        "body": "عند كتابة الخوارزمية بالطريقة التدفقية نستخدم رمز المعين لعمليات الإدخال والإخراج.",
        "answer": {
          "verdict": "خطأ",
          "correction": "نستخدم رمز متوازي الأضلاع لعمليات الإدخال والإخراج."
        }
      },
      {
        "id": "true-false-4",
        "number": 4,
        "body": "نستخدم التعليمة `cout` لقراءة قيمة من المستخدم.",
        "answer": {
          "verdict": "خطأ",
          "correction": "نستخدم التعليمة `cin` لقراءة قيمة من المستخدم."
        }
      },
      {
        "id": "true-false-5",
        "number": 5,
        "body": "يمكن لاسم المتحول في `C++` أن يبدأ برقم.",
        "answer": {
          "verdict": "خطأ",
          "correction": "لا يمكن لاسم المتحول أن يبدأ برقم."
        }
      },
      {
        "id": "true-false-6",
        "number": 6,
        "body": "للتصريح عن متحول من نمط عدد صحيح نكتب:\n\n   ```cpp\n   int a = 3;\n   ```",
        "answer": {
          "verdict": "صح",
          "correction": ""
        }
      },
      {
        "id": "true-false-7",
        "number": 7,
        "body": "تعليمة الطباعة على الشاشة هي:\n\n   ```cpp\n   for\n   ```",
        "answer": {
          "verdict": "خطأ",
          "correction": "تعليمة الطباعة على الشاشة هي `cout`."
        }
      },
      {
        "id": "true-false-8",
        "number": 8,
        "body": "لنتمكن من استخدام الدوال الرياضية يجب تضمين الملف الرأسي:\n\n   ```cpp\n   <iostream.h>\n   ```",
        "answer": {
          "verdict": "خطأ",
          "correction": "لاستخدام الدوال الرياضية نضمّن الملف الرأسي `<math.h>`."
        }
      },
      {
        "id": "true-false-9",
        "number": 9,
        "body": "بفرض:\n\n   ```cpp\n   a = 18\n   b = 3\n   c = a % b\n   ```\n\n   فإن قيمة `c` هي `6`.",
        "answer": {
          "verdict": "خطأ",
          "correction": "قيمة `c` هي `0`."
        }
      },
      {
        "id": "true-false-10",
        "number": 10,
        "body": "نستخدم التعليمة `if` لتنفيذ مجموعة من التعليمات عدة مرات.",
        "answer": {
          "verdict": "خطأ",
          "correction": "نستخدم حلقات التكرار مثل `for` أو `while` لتنفيذ التعليمات عدة مرات."
        }
      },
      {
        "id": "true-false-11",
        "number": 11,
        "body": "بفرض:\n\n   ```cpp\n   a = 5\n   a *= 10\n   ```\n\n   فإن قيمة `a` هي `15`.",
        "answer": {
          "verdict": "خطأ",
          "correction": "قيمة `a` هي `50`."
        }
      },
      {
        "id": "true-false-12",
        "number": 12,
        "body": "الدالة الرياضية `sqrt(x)` تستخدم لإيجاد الجذر التربيعي للعدد `x`.",
        "answer": {
          "verdict": "صح",
          "correction": ""
        }
      },
      {
        "id": "true-false-13",
        "number": 13,
        "body": "التعليمة التالية تُستخدم للتصريح عن متحول من نوع عدد صحيح:\n\n   ```cpp\n   bool x;\n   ```",
        "answer": {
          "verdict": "خطأ",
          "correction": "النمط `bool` يُستخدم للتصريح عن متحول منطقي، وللعدد الصحيح نستخدم `int`."
        }
      },
      {
        "id": "true-false-14",
        "number": 14,
        "body": "عند كتابة الخوارزمية بالطريقة البيانية نستخدم رمز المعين لعمليات المعالجة.",
        "answer": {
          "verdict": "خطأ",
          "correction": "نستخدم رمز المستطيل لعمليات المعالجة."
        }
      },
      {
        "id": "true-false-15",
        "number": 15,
        "body": "يمكن أن يكون اسم المتحول بالشكل التالي:\n\n   ```cpp\n   f@m\n   ```",
        "answer": {
          "verdict": "خطأ",
          "correction": "اسم المتحول لايمكن ان يحتوي على رموز مثل @"
        }
      },
      {
        "id": "true-false-16",
        "number": 16,
        "body": "تعليمة الطباعة على الشاشة هي:\n\n   ```cpp\n   cin\n   ```",
        "answer": {
          "verdict": "خطأ",
          "correction": "تعليمة الطباعة على الشاشة هي `cout`."
        }
      },
      {
        "id": "true-false-17",
        "number": 17,
        "body": "للتصريح عن متحول من نمط عدد صحيح نستخدم النمط:\n\n   ```cpp\n   char\n   ```",
        "answer": {
          "verdict": "خطأ",
          "correction": "للتصريح عن متحول من نمط عدد صحيح نستخدم `int`."
        }
      },
      {
        "id": "true-false-18",
        "number": 18,
        "body": "تعتبر لغة `C++` حساسة لحالة الأحرف، أي تميز بين الأحرف الكبيرة والصغيرة.",
        "answer": {
          "verdict": "صح",
          "correction": ""
        }
      },
      {
        "id": "true-false-19",
        "number": 19,
        "body": "النمط `int` يتم حجزه في الذاكرة بالحجم `1 byte`.",
        "answer": {
          "verdict": "خطأ",
          "correction": "حجم `int` هو `4 bytes`."
        }
      },
      {
        "id": "true-false-20",
        "number": 20,
        "body": "بفرض:\n\n   ```cpp\n   a = 10\n   b = 3\n   c = a % b\n   ```\n\n   فإن قيمة `c` هي `3`.",
        "answer": {
          "verdict": "خطأ",
          "correction": "قيمة `c` هي `1`."
        }
      },
      {
        "id": "true-false-21",
        "number": 21,
        "body": "نستخدم التعليمة `if` لتنفيذ مجموعة من التعليمات إذا تحقق شرط معين.",
        "answer": {
          "verdict": "صح",
          "correction": ""
        }
      },
      {
        "id": "true-false-22",
        "number": 22,
        "body": "بفرض:\n\n   ```cpp\n   a = 2\n   a += 10\n   ```\n\n   فإن قيمة `a` هي `10`.",
        "answer": {
          "verdict": "خطأ",
          "correction": "قيمة `a` هي `12`."
        }
      },
      {
        "id": "true-false-23",
        "number": 23,
        "body": "ناتج تنفيذ العملية الحسابية التالية هو `6`:\n\n   ```cpp\n   6 + 2 * 4 - 8 / 4\n   ```",
        "answer": {
          "verdict": "خطأ",
          "correction": "ناتج العملية هو `12`."
        }
      },
      {
        "id": "true-false-24",
        "number": 24,
        "body": "لكتابة تعليق يحتوي على أكثر من سطر نكتب:\n\n```cpp\n//\n```",
        "answer": {
          "verdict": "خطأ",
          "correction": "للتعليق متعدد الأسطر نستخدم `/* ... */`."
        }
      },
      {
        "id": "true-false-25",
        "number": 25,
        "body": "بفرض:\n\n   ```cpp\n   x = 7\n   y = 3\n   z = x % y\n   ```\n\n   فإن قيمة `z` هي `2`.",
        "answer": {
          "verdict": "خطأ",
          "correction": "قيمة `z` هي `1`."
        }
      },
      {
        "id": "true-false-26",
        "number": 26,
        "body": "التصريح عن متحول من نوع عدد عشري يكون بالشكل:\n\n   ```cpp\n   char x = 5.7;\n   ```",
        "answer": {
          "verdict": "خطأ",
          "correction": "للتصريح عن متحول عشري نستخدم `float` أو `double`."
        }
      },
      {
        "id": "true-false-27",
        "number": 27,
        "body": "نتيجة العملية الحسابية التالية هي `22`:\n\n   ```cpp\n   6 + 8 / 2 + 4 * 2\n   ```",
        "answer": {
          "verdict": "خطأ",
          "correction": "نتيجة العملية هي `18`."
        }
      },
      {
        "id": "true-false-28",
        "number": 28,
        "body": "التعليمة التي تؤدي إلى تنفيذ مجموعة من التعليمات عددًا من المرات هي:\n\n   ```cpp\n   if\n   ```",
        "answer": {
          "verdict": "خطأ",
          "correction": "التعليمة التي تنفذ مجموعة تعليمات عددًا من المرات هي حلقة تكرار مثل `for`."
        }
      },
      {
        "id": "true-false-29",
        "number": 29,
        "body": "تعليمة القراءة والإدخال هي:\n\n   ```cpp\n   while\n   ```",
        "answer": {
          "verdict": "خطأ",
          "correction": "تعليمة القراءة والإدخال هي `cin`."
        }
      },
      {
        "id": "true-false-30",
        "number": 30,
        "body": "التصريح عن متحول من نوع عدد صحيح يكون بالشكل:\n\n   ```cpp\n   float z = 2.3;\n   ```",
        "answer": {
          "verdict": "خطأ",
          "correction": "للتصريح عن متحول صحيح نستخدم `int`، مثل `int z = 2;`."
        }
      },
      {
        "id": "true-false-31",
        "number": 31,
        "body": "ناتج تنفيذ العملية الحسابية التالية هو `6`:\n\n   ```cpp\n   6 + 2 * 4 / 4\n   ```",
        "answer": {
          "verdict": "خطأ",
          "correction": "ناتج العملية هو `8`."
        }
      },
      {
        "id": "true-false-32",
        "number": 32,
        "body": "نستخدم التعليمة `for` لتنفيذ مجموعة من التعليمات عدة مرات.",
        "answer": {
          "verdict": "صح",
          "correction": ""
        }
      },
      {
        "id": "true-false-33",
        "number": 33,
        "body": "تعليمة الطباعة على الشاشة هي:\n\n   ```cpp\n   while\n   ```",
        "answer": {
          "verdict": "خطأ",
          "correction": "تعليمة الطباعة على الشاشة هي `cout`."
        }
      },
      {
        "id": "true-false-34",
        "number": 34,
        "body": "بفرض:\n\n   ```cpp\n   a = 2\n   b = 5\n   c = a % b\n   ```\n\n   فإن قيمة `c` هي `4`.",
        "answer": {
          "verdict": "خطأ",
          "correction": "قيمة `c` هي `2`."
        }
      },
      {
        "id": "true-false-35",
        "number": 35,
        "body": "نستخدم الرمز `\\n` لتحريك المؤشر مسافة جدولية أفقية.",
        "answer": {
          "verdict": "خطأ",
          "correction": "الرمز `\\n` للانتقال إلى سطر جديد، والرمز `\\t` لمسافة جدولية أفقية."
        }
      },
      {
        "id": "true-false-36",
        "number": 36,
        "body": "التعليمة التالية تستخدم للتصريح عن متحول عشري:\n\n   ```cpp\n   char a;\n   ```",
        "answer": {
          "verdict": "خطأ",
          "correction": "للتصريح عن متحول عشري نستخدم `float` أو `double`."
        }
      },
      {
        "id": "true-false-37",
        "number": 37,
        "body": "بفرض:\n\n   ```cpp\n   x = 16\n   y = 5\n   z = x % y\n   ```\n\n   فإن قيمة `z` هي `3.5`.",
        "answer": {
          "verdict": "خطأ",
          "correction": "قيمة `z` هي `1`."
        }
      },
      {
        "id": "true-false-38",
        "number": 38,
        "body": "يمكن لاسم المتحول في `C++` أن يحتوي مسافة فارغة.",
        "answer": {
          "verdict": "خطأ",
          "correction": "لا يمكن لاسم المتحول أن يحتوي مسافة فارغة."
        }
      }
    ]
  },
  {
    "id": "multiple-choice",
    "title": "اختر الإجابة الصحيحة",
    "instruction": "اختر الإجابة الصحيحة لكل مما يلي:",
    "items": [
      {
        "id": "multiple-choice-1",
        "number": 1,
        "body": "التصريح عن متحول من نوع عدد عشري يكون بالشكل:\n\n   أ.\n\n   ```cpp\n   int x = 5.7;\n   ```\n\n   ب.\n\n   ```cpp\n   int x = 5;\n   ```\n\n   ج.\n\n   ```cpp\n   float x = 5.7;\n   ```",
        "answer": {
          "verdict": "ج",
          "correction": "`float x = 5.7;`"
        }
      },
      {
        "id": "multiple-choice-2",
        "number": 2,
        "body": "ناتج تنفيذ العملية الحسابية التالية:\n\n   ```cpp\n   3 + 1 * 6 - 6 / 2\n   ```\n\n   أ. `6`\n   ب. `9`\n   ج. `21`",
        "answer": {
          "verdict": "أ",
          "correction": "`6`"
        }
      },
      {
        "id": "multiple-choice-3",
        "number": 3,
        "body": "التعليمة التي تؤدي إلى تنفيذ مجموعة من التعليمات عددًا محددًا من المرات هي:\n\n   أ. `for`\n   ب. `while`\n   ج. `cin`",
        "answer": {
          "verdict": "أ",
          "correction": "`for`"
        }
      },
      {
        "id": "multiple-choice-4",
        "number": 4,
        "body": "تعليمة الطباعة على الشاشة هي:\n\n   أ. `print`\n   ب. `cin`\n   ج. `cout`",
        "answer": {
          "verdict": "ج",
          "correction": "`cout`"
        }
      },
      {
        "id": "multiple-choice-5",
        "number": 5,
        "body": "بفرض:\n\n   ```cpp\n   x = 11\n   y = 3\n   z = x % y\n   ```\n\n   فإن قيمة `z` هي:\n\n   أ. `1`\n   ب. `2.5`\n   ج. `2`",
        "answer": {
          "verdict": "ج",
          "correction": "`2`"
        }
      },
      {
        "id": "multiple-choice-6",
        "number": 6,
        "body": "التصريح عن متحول من نوع عدد عشري يكون بالشكل:\n\n   أ.\n\n   ```cpp\n   int y = 5.7;\n   ```\n\n   ب.\n\n   ```cpp\n   int y = 5;\n   ```\n\n   ج.\n\n   ```cpp\n   float y = 5.7;\n   ```",
        "answer": {
          "verdict": "ج",
          "correction": "`float y = 5.7;`"
        }
      },
      {
        "id": "multiple-choice-7",
        "number": 7,
        "body": "ناتج تنفيذ العملية الحسابية التالية:\n\n   ```cpp\n   5 + 2 * 6 - 6 % 2\n   ```\n\n   أ. `39`\n   ب. `4`\n   ج. `17`",
        "answer": {
          "verdict": "ج",
          "correction": "`17`"
        }
      },
      {
        "id": "multiple-choice-8",
        "number": 8,
        "body": "التعليمة التي تؤدي إلى تنفيذ مجموعة من التعليمات عند تحقق شرط معين:\n\n   أ. `main`\n   ب. `cin`\n   ج. `if`",
        "answer": {
          "verdict": "ج",
          "correction": "`if`"
        }
      },
      {
        "id": "multiple-choice-9",
        "number": 9,
        "body": "اسم المتحول في `C++` يجب:\n\n   أ. أن يبدأ برقم.\n   ب. ألا يتضمن فراغات.\n   ج. أن يكون من الأسماء المحجوزة في اللغة.",
        "answer": {
          "verdict": "ب",
          "correction": "ألا يتضمن فراغات."
        }
      }
    ]
  },
  {
    "id": "debug-code",
    "title": "صحح أخطاء البرنامج",
    "instruction": "صحح الأخطاء الموجودة في البرامج التالية:",
    "items": [
      {
        "id": "debug-code-1",
        "number": 1,
        "body": "صحح الأخطاء الموجودة في البرنامج التالي، والذي يأخذ كدخل عددين صحيحين ثم يقوم بحساب مجموعهما وباقي قسمة الأول على الثاني.\r\n\r\n```cpp\r\n#include <iostream.h>\r\n\r\nmain()\r\n{\r\n    char x, y;\r\n\r\n    cin >> x >> y;\r\n\r\n    cin << \"Sum=\" << x+y << \"\\n\"\r\n\r\n    cout << \"Mod=\" << x/y << \"\\n\";\r\n\r\n    return 0;\r\n}\r\n```"
      },
      {
        "id": "debug-code-2",
        "number": 2,
        "body": "صحح الأخطاء الموجودة في البرنامج التالي، والذي يقوم بحساب مجموع الأعداد الزوجية الموجودة في المجال من 15 إلى 25.\r\n\r\n```cpp\r\n#include <iostream.h>\r\n\r\nmain()\r\n{\r\n    bool sum = 0;\r\n\r\n    for (int i = 1; i <= 15; i--)\r\n    {\r\n        if (i / 2 = 0);\r\n            sum = sum + 1;\r\n    }\r\n\r\n    cin << \"sum is : \" << i;\r\n\r\n    return 0;\r\n}\r\n```"
      },
      {
        "id": "debug-code-3",
        "number": 3,
        "body": "صحح الأخطاء الموجودة في البرنامج التالي، والذي يقوم بحساب مجموع الأعداد الزوجية ضمن المجال من `1` إلى `30`.\r\n\r\n```cpp\r\n#include <math.h>\r\n\r\nmain()\r\n{\r\n    int sum = 1;\r\n\r\n    for (int i = 1; i <= 10; i++)\r\n    {\r\n        if (i / 2 == 0)\r\n            sum = sum + 1;\r\n    }\r\n\r\n    cout << \"sum is : \" << i;\r\n\r\n    return 0;\r\n}\r\n```"
      },
      {
        "id": "debug-code-4",
        "number": 4,
        "body": "صحح الأخطاء الموجودة في البرنامج التالي، والذي يأخذ كدخل عددين صحيحين ثم يطبع مجموعهما وباقي قسمة الأول على الثاني.\r\n\r\n```cpp\r\n#include <iostream.h>\r\n\r\nmain()\r\n{\r\n    char x, y;\r\n\r\n    cin >> x >> y;\r\n\r\n    cin << x + y << \"\\n\"\r\n\r\n    cout << x / y << \"\\n\";\r\n\r\n    return 0;\r\n}\r\n```"
      },
      {
        "id": "debug-code-5",
        "number": 5,
        "body": "صحح الأخطاء الموجودة في البرنامج التالي، والذي يقوم بقراءة نصف قطر دائرة ثم يطبع قيمة محيطها ومساحتها.\r\n\r\n```cpp\r\n#include <iostream.h>\r\n\r\nmain()\r\n{\r\n    bool r;\r\n\r\n    double s, m;\r\n\r\n    double p = 3.14;\r\n\r\n    cin >> r;\r\n\r\n    m = 2 * p * r;\r\n\r\n    s = p * r * r;\r\n\r\n    cin >> \"m = \" >> m >> \"\\n\";\r\n\r\n    cout << \"s = \" << s << \"\\n\";\r\n\r\n    return 0;\r\n}\r\n```"
      },
      {
        "id": "debug-code-6",
        "number": 6,
        "body": "صحح الأخطاء الموجودة في البرنامج التالي، والذي يقوم بحساب مجموع الأعداد من `30` إلى `50`.\r\n\r\n```cpp\r\n#include <iostream.h>\r\n\r\nmain()\r\n{\r\n    char sum = 0;\r\n\r\n    while (i = 1; i++; i <= 20)\r\n    {\r\n        sum == sum + 0;\r\n    }\r\n\r\n    cin << \"sum is\" << i;\r\n\r\n    return 0;\r\n}\r\n```"
      },
      {
        "id": "debug-code-7",
        "number": 7,
        "body": "صحح الأخطاء الموجودة في البرنامج التالي، والذي يقوم بقراءة مجموع `3` أعداد صحيحة ومتوسطها الحسابي.\r\n\r\n```cpp\r\ninclude <iostream.h>\r\n\r\nin()\r\n{\r\n    float x1, x2, x3;\r\n\r\n    cout >> x1 >> x2 >> x3;\r\n\r\n    cin << x1 + x2 + x3\r\n\r\n    cout < x1 + x2 + x3 / 3;\r\n\r\n    return 0;\r\n}\r\n```"
      },
      {
        "id": "debug-code-8",
        "number": 8,
        "body": "صحح الأخطاء الموجودة في البرنامج التالي، والذي يقوم بحساب مجموع الأعداد الزوجية ضمن المجال من `1` إلى `30`.\r\n\r\n```cpp\r\n#include <math.h>\r\n\r\nmain()\r\n{\r\n    int sum = 1;\r\n\r\n    for (int i = 1; i <= 10; i++)\r\n    {\r\n        if (i / 2 == 0)\r\n            sum = sum + 1;\r\n    }\r\n\r\n    cout << \"sum is :\" << i;\r\n\r\n    return 0;\r\n}\r\n```"
      },
      {
        "id": "debug-code-9",
        "number": 9,
        "body": "صحح الأخطاء الموجودة في البرنامج التالي، والذي يقوم بحساب مجموع الأعداد الزوجية الموجودة في المجال من `0` إلى `30`.\r\n\r\n```cpp\r\n#include <iostream.h>\r\n\r\nmain()\r\n{\r\n    char sum = 0;\r\n\r\n    for (i = 1; i <= 15; i--)\r\n    {\r\n        if (i / 2 = 0)\r\n            sum = sum + 1;\r\n    }\r\n\r\n    cin << \"sum is : \" << i;\r\n\r\n    return 0;\r\n}\r\n```"
      },
      {
        "id": "debug-code-10",
        "number": 10,
        "body": "صحح الأخطاء الموجودة في البرنامج التالي، والذي يقوم بحساب المتوسط الحسابي للأعداد الموجودة في المجال من `1` إلى `10`.\r\n\r\n```cpp\r\n#include <iostream.h>\r\n\r\nmain()\r\n{\r\n    int sum = 1;\r\n\r\n    for (int i = 1; i <= 10; i--)\r\n    {\r\n        sum = sum + 1;\r\n    }\r\n\r\n    cout << \"avg = \" << i;\r\n\r\n    return 0;\r\n}\r\n```"
      },
      {
        "id": "debug-code-11",
        "number": 11,
        "body": "صحح الأخطاء الموجودة في البرنامج التالي، والذي يقوم بقراءة نصف قطر دائرة، ثم يطبع قيمة قطرها ومحيطها ومساحتها.\r\n\r\n```cpp\r\n#include <iostream.h>\r\n\r\nmain()\r\n{\r\n    bool r;\r\n\r\n    float p = 3.14;\r\n\r\n    cin >> r\r\n\r\n    cin << r * 2 << \"\\n\";\r\n\r\n    cout << 2 * p * R << \"\\n\";\r\n\r\n    cout << p * r * r << \"\\n\";\r\n\r\n    return 0;\r\n}\r\n```"
      }
    ]
  },
  {
    "id": "write-program",
    "title": "اكتب برنامجًا",
    "instruction": "اكتب البرامج المطلوبة في البنود التالية:",
    "items": [
      {
        "id": "write-program-1",
        "number": 1,
        "body": "اكتب برنامجًا يأخذ كدخل علامات طالب في 3 مواد، ثم يطبع على الشاشة مجموع العلامات والمعدل، أي المتوسط الحسابي."
      },
      {
        "id": "write-program-2",
        "number": 2,
        "body": "اكتب برنامجًا يطلب من المستخدم إدخال علامات طالب في 5 مواد، ثم يقوم بحساب معدل هذا الطالب، فإذا كان المعدل أعلى من 70 يطبع على الشاشة العبارة `Very Good`، وإلا يطبع العبارة `Accepted`."
      },
      {
        "id": "write-program-3",
        "number": 3,
        "body": "اكتب برنامجًا باستخدام تعليمة `if` يسمح للمستخدم بإدخال علاماته في ستة مقررات، ثم يقوم بحساب المعدل، فإذا كان المعدل أعلى من `80` يطبع على الشاشة العبارة `Good Level`، وإذا كان أصغر يطبع على الشاشة العبارة `You should work hard`."
      },
      {
        "id": "write-program-4",
        "number": 4,
        "body": "اكتب برنامجًا يطلب من المستخدم إدخال أسعار `3` مواد غذائية، ثم يطبع على الشاشة مجموع أسعار هذه المواد والمتوسط الحسابي لهذه الأسعار."
      },
      {
        "id": "write-program-5",
        "number": 5,
        "body": "اكتب برنامجًا يطلب من المستخدم إدخال `10` أعداد صحيحة، ثم يقوم بحساب ناتج جمع هذه الأعداد، فإذا كان الناتج أكبر تمامًا من `200` يطبع العبارة `Between 100 and 200`، وإذا كان يساوي `500` يطبع العبارة `Equal 500`، وإذا كان غير ذلك يطبع العبارة `Try again`."
      },
      {
        "id": "write-program-6",
        "number": 6,
        "body": "اكتب برنامجًا لإدخال عددين صحيحين وحساب ناتج ضربهما، فإذا كان ناتج الضرب عددًا زوجيًا تتم طباعة العبارة `even value` على الشاشة، وإلا تتم طباعة العبارة `odd value` على الشاشة."
      },
      {
        "id": "write-program-7",
        "number": 7,
        "body": "اكتب برنامجًا يطلب من المستخدم إدخال أسعار `5` مواد غذائية، ثم يقوم بحساب مجموع ومتوسط أسعار هذه المواد."
      },
      {
        "id": "write-program-8",
        "number": 8,
        "body": "اكتب برنامجًا يطلب من المستخدم إدخال `10` أعداد صحيحة، ثم يقوم بحساب ناتج جمع هذه الأعداد، فإذا كان الناتج أكبر من `100` وأصغر تمامًا من `200` يطبع العبارة `Between 100 and 200`، وإذا كان يساوي `500` يطبع العبارة `Equal 500`، وإذا كان غير ذلك يطبع العبارة `Try again`."
      }
    ]
  },
  {
    "id": "flowchart",
    "title": "الخوارزمية البيانية والنصية",
    "instruction": "اكتب الخوارزمية البيانية أو الخوارزمية النصية المطلوبة لكل مما يلي:",
    "items": [
      {
        "id": "flowchart-1",
        "number": 1,
        "body": "اكتب بالطريقة البيانية، أي الخوارزمية البيانية، الخوارزمية اللازمة لإدخال عدد صحيح `y` وطباعة العبارة `Positive` إذا كان موجبًا والعبارة `Negative` إذا كان سالبًا."
      },
      {
        "id": "flowchart-2",
        "number": 2,
        "body": "اكتب الخوارزمية اللازمة لحساب ناتج:\r\n\r\n```cpp\r\ny = x / (x - 3)\r\n```\r\n\r\nبالطريقة البيانية، أي الخوارزمية البيانية."
      },
      {
        "id": "flowchart-3",
        "number": 3,
        "body": "اكتب بالطريقة البيانية الخوارزمية اللازمة لإدخال عدد صحيح `y`، ثم طباعة ناتج العملية:\r\n\r\n```cpp\r\n1 / (y - 7)\r\n```"
      },
      {
        "id": "flowchart-4",
        "number": 4,
        "body": "اكتب بالطريقة البيانية الخوارزمية اللازمة لقراءة علامة طالب `mark`، فإذا كانت العلامة ناجحة يطبع العبارة `passed`، وإذا كانت راسبة يطبع العبارة `failed`."
      },
      {
        "id": "flowchart-5",
        "number": 5,
        "body": "اكتب الخوارزمية اللازمة لحساب:\r\n\r\n```cpp\r\ny = x / (x - 3)\r\n```\r\n\r\nبالطريقة البيانية، أي الخوارزمية البيانية."
      },
      {
        "id": "flowchart-6",
        "number": 6,
        "body": "اكتب بالطريقة البيانية الخوارزمية المناسبة لقراءة علامة طالب `mark`، في مادة، وطباعة العبارة `passed` إذا كان ناجحًا، وطباعة العبارة `failed` إذا كان راسبًا.\r\nشرط النجاح هو الحصول على العلامة `60` أو أكثر."
      },
      {
        "id": "flowchart-7",
        "number": 7,
        "body": "اكتب بالطريقة البيانية، أي الخوارزمية البيانية، الخوارزمية اللازمة لإدخال عدد صحيح `x` وطباعة العبارة `Positive` إذا كان هذا العدد موجبًا، والعبارة `Negative` إذا كان سالبًا."
      },
      {
        "id": "flowchart-8",
        "number": 8,
        "body": "اكتبي الخوارزمية النصية والخوارزمية البيانية لحساب محيط ومساحة مربع، طول ضلعه `x`."
      },
      {
        "id": "flowchart-9",
        "number": 9,
        "body": "اكتب الخوارزمية النصية والخوارزمية البيانية لإدخال `x`، وإيجاد قيمة:\r\n\r\n```cpp\r\ny = x / (x - 7)\r\n```"
      }
    ]
  },
  {
    "id": "trace-code",
    "title": "نتيجة تنفيذ المقاطع البرمجية",
    "instruction": "اكتب نتيجة تنفيذ كل مقطع برمجي مما يلي:",
    "items": [
      {
        "id": "trace-code-1",
        "number": 1,
        "body": "```cpp\nint z = 8;\nint y = 6;\n\nif (z <= 10 && y > 5)\n    cout << \"values are between 5 and 10\";\nelse\n    cout << \"wrong value\";\n```",
        "answer": {
          "verdict": "الناتج",
          "correction": "```text\nvalues are between 5 and 10\n```"
        }
      },
      {
        "id": "trace-code-2",
        "number": 2,
        "body": "```cpp\nfor (int i = 1; i <= 10; i++)\n{\n    if (i % 2 == 0)\n        cout << i << \"\\n\";\n}\n```",
        "answer": {
          "verdict": "الناتج",
          "correction": "```text\n2\n4\n6\n8\n10\n```"
        }
      },
      {
        "id": "trace-code-3",
        "number": 3,
        "body": "```cpp\nint s = 5;\n\ns = s + 2 * 3 - 11;\n\ncout << \"value is: \" << s;\n```",
        "answer": {
          "verdict": "الناتج",
          "correction": "```text\nvalue is: 0\n```"
        }
      },
      {
        "id": "trace-code-4",
        "number": 4,
        "body": "```cpp\nint x = 9;\n\ncout << x++ << \"\\n\";\n\ncout << x;\n```",
        "answer": {
          "verdict": "الناتج",
          "correction": "```text\n9\n10\n```"
        }
      },
      {
        "id": "trace-code-5",
        "number": 5,
        "body": "```cpp\nfor (int i = 1; i <= 5; i++)\n    cout << i << endl;\n```",
        "answer": {
          "verdict": "الناتج",
          "correction": "```text\n1\n2\n3\n4\n5\n```"
        }
      },
      {
        "id": "trace-code-6",
        "number": 6,
        "body": "```cpp\nfor (int i = 5; i >= 0; i--)\n{\n    if (i % 2 == 0)\n        cout << i << \"\\n\";\n}\n```",
        "answer": {
          "verdict": "الناتج",
          "correction": "```text\n4\n2\n0\n```"
        }
      },
      {
        "id": "trace-code-7",
        "number": 7,
        "body": "```cpp\nint n = 3, d = 2000;\n\nswitch (n)\n{\n    case 0:\n        cout << d;\n        break;\n\n    case 1:\n        cout << d + 100;\n        break;\n\n    default:\n        cout << d + 100 + (n - 2) * 500;\n        break;\n}\n```",
        "answer": {
          "verdict": "الناتج",
          "correction": "```text\n2600\n```"
        }
      },
      {
        "id": "trace-code-8",
        "number": 8,
        "body": "```cpp\nint x = 5, y = 3;\n\nif (x >= 2 && y > 5)\n    cout << \"val =\" << x * y;\nelse\n    cout << \"value =\" << x + y;\n```",
        "answer": {
          "verdict": "الناتج",
          "correction": "```text\nvalue =8\n```"
        }
      },
      {
        "id": "trace-code-9",
        "number": 9,
        "body": "```cpp\nint a = 10;\n\ncout << a-- << \"\\t\";\n\ncout << a;\n```",
        "answer": {
          "verdict": "الناتج",
          "correction": "```text\n10\t9\n```"
        }
      },
      {
        "id": "trace-code-10",
        "number": 10,
        "body": "```cpp\nint i = 1, x = 0;\n\nwhile (i <= 10)\n{\n    x = x + i;\n    i++;\n}\n\ncout << \"Sum = \" << x;\n```",
        "answer": {
          "verdict": "الناتج",
          "correction": "```text\nSum = 55\n```"
        }
      },
      {
        "id": "trace-code-11",
        "number": 11,
        "body": "```cpp\nint x = 10, y = 8, z;\n\nz = x + y;\n\ncout << \"x + y = \\t\" << z;\n```",
        "answer": {
          "verdict": "الناتج",
          "correction": "```text\nx + y = \t18\n```"
        }
      },
      {
        "id": "trace-code-12",
        "number": 12,
        "body": "```cpp\nint a = 13;\n\ncout << a << endl;\n\ncout << ++a << endl;\n\ncout << a << endl;\n```",
        "answer": {
          "verdict": "الناتج",
          "correction": "```text\n13\n14\n14\n```"
        }
      },
      {
        "id": "trace-code-13",
        "number": 13,
        "body": "```cpp\nint a = 4, b;\n\nb = a - 10 / 2;\n\ncout << b << \"\\n\";\n\nif (b >= 0)\n    cout << \"postitive\" << \"\\n\";\nelse\n    cout << \"Negative\" << \"\\n\";\n```",
        "answer": {
          "verdict": "الناتج",
          "correction": "```text\n-1\nNegative\n```"
        }
      },
      {
        "id": "trace-code-14",
        "number": 14,
        "body": "```cpp\nint z = 8;\n\ncout << z << \"\\n\";\n\ncout << z-- << \"\\n\";\n\ncout << z << \"\\n\";\n```",
        "answer": {
          "verdict": "الناتج",
          "correction": "```text\n8\n8\n7\n```"
        }
      },
      {
        "id": "trace-code-15",
        "number": 15,
        "body": "```cpp\nint x = 4, y = 11;\n\nif (x % 2 == 0 && y > 10)\n    cout << \"value is \" << x + y;\nelse\n    cout << \"The Val = \" << x * y;\n```",
        "answer": {
          "verdict": "الناتج",
          "correction": "```text\nvalue is 15\n```"
        }
      },
      {
        "id": "trace-code-16",
        "number": 16,
        "body": "```cpp\nfor (int i = 10; i < 15; i++)\n{\n    if (i == 13)\n        break;\n\n    cout << i << endl;\n}\n```",
        "answer": {
          "verdict": "الناتج",
          "correction": "```text\n10\n11\n12\n```"
        }
      },
      {
        "id": "trace-code-17",
        "number": 17,
        "body": "```cpp\nfor (int i = 6; i > 1; i--)\n{\n    if (i % 2 != 0)\n        continue;\n\n    cout << i << \"\\t\" << i * i << endl;\n}\n```",
        "answer": {
          "verdict": "الناتج",
          "correction": "```text\n6\t36\n4\t16\n2\t4\n```"
        }
      },
      {
        "id": "trace-code-18",
        "number": 18,
        "body": "```cpp\nint num = 10;\n\ncout << num++ << \"\\n\";\n\ncout << num;\n```",
        "answer": {
          "verdict": "الناتج",
          "correction": "```text\n10\n11\n```"
        }
      },
      {
        "id": "trace-code-19",
        "number": 19,
        "body": "```cpp\nint z = 5, y = 10;\n\nif (z <= 8 && y < 5)\n    cout << \"values are between 0 and 10\";\nelse\n    cout << \"wrong value\";\n```",
        "answer": {
          "verdict": "الناتج",
          "correction": "```text\nwrong value\n```"
        }
      },
      {
        "id": "trace-code-20",
        "number": 20,
        "body": "```cpp\nint s = 3;\n\ns = s + 2 * 3 - 9;\n\ncout << \"value is: \" << s;\n```",
        "answer": {
          "verdict": "الناتج",
          "correction": "```text\nvalue is: 0\n```"
        }
      },
      {
        "id": "trace-code-21",
        "number": 21,
        "body": "```cpp\nint y = 8;\n\ncout << --y << \"\\n\";\n\ncout << y;\n```",
        "answer": {
          "verdict": "الناتج",
          "correction": "```text\n7\n7\n```"
        }
      },
      {
        "id": "trace-code-22",
        "number": 22,
        "body": "```cpp\nint x = 11;\n\ncout << x++ << \"\\n\";\n\ncout << x;\n```",
        "answer": {
          "verdict": "الناتج",
          "correction": "```text\n11\n12\n```"
        }
      },
      {
        "id": "trace-code-23",
        "number": 23,
        "body": "```cpp\nint s = 16, m = 2;\n\nif (s >= 4 && m > 10)\n    cout << \"result =\" << pow(m, 5);\nelse\n    cout << \"result =\" << pow(m, 3);\n```",
        "answer": {
          "verdict": "الناتج",
          "correction": "```text\nresult =8\n```"
        }
      },
      {
        "id": "trace-code-24",
        "number": 24,
        "body": "```cpp\nfor (int i = 1; i <= 20; i++)\n{\n    if (i % 2 != 0)\n        continue;\n\n    cout << i << \"\\n\";\n}\n```",
        "answer": {
          "verdict": "الناتج",
          "correction": "```text\n2\n4\n6\n8\n10\n12\n14\n16\n18\n20\n```"
        }
      },
      {
        "id": "trace-code-25",
        "number": 25,
        "body": "```cpp\nint i = 1;\n\nwhile (i <= 5)\n{\n    cout << i << \"\\t\";\n\n    i++;\n}\n```",
        "answer": {
          "verdict": "الناتج",
          "correction": "```text\n1\t2\t3\t4\t5\t\n```"
        }
      },
      {
        "id": "trace-code-26",
        "number": 26,
        "body": "```cpp\nint z = 20;\n\ncout << z-- << \"\\n\";\n\ncout << z << \"\\n\";\n```",
        "answer": {
          "verdict": "الناتج",
          "correction": "```text\n20\n19\n```"
        }
      },
      {
        "id": "trace-code-27",
        "number": 27,
        "body": "```cpp\nint n = 4, d;\n\nd = 6 + n / 2;\n\nswitch (d)\n{\n    case 5:\n        cout << d * 10;\n        break;\n\n    case 8:\n        cout << d * 100;\n        break;\n\n    default:\n        cout << \"Error\";\n        break;\n}\n```",
        "answer": {
          "verdict": "الناتج",
          "correction": "```text\n800\n```"
        }
      },
      {
        "id": "trace-code-28",
        "number": 28,
        "body": "```cpp\nfor (int i = 5; i <= 10; i++)\n{\n    if (i == 7)\n        break;\n\n    cout << i << endl;\n}\n```",
        "answer": {
          "verdict": "الناتج",
          "correction": "```text\n5\n6\n```"
        }
      },
      {
        "id": "trace-code-29",
        "number": 29,
        "body": "```cpp\nint x = 4, y = 11;\n\nif (x % 2 == 0 && y > 10)\n    cout << \"value is\" << x + y;\nelse\n    cout << \"The Val = \" << x * y;\n```",
        "answer": {
          "verdict": "الناتج",
          "correction": "```text\nvalue is15\n```"
        }
      },
      {
        "id": "trace-code-30",
        "number": 30,
        "body": "```cpp\nint a = 10, b;\n\nb = a + 8 / 2;\n\ncout << b << \"\\n\";\n\nif (b <= 9)\n    cout << \"values are between 0 and 15\";\nelse\n    cout << \"values more than 15\";\n```",
        "answer": {
          "verdict": "الناتج",
          "correction": "```text\n14\nvalues more than 15\n```"
        }
      },
      {
        "id": "trace-code-31",
        "number": 31,
        "body": "```cpp\nint z = 10;\n\ncout << --z << \"\\n\";\n\ncout << z;\n\nint y = 20;\n\ncout << y << \"\\n\";\n\ncout << y;\n```",
        "answer": {
          "verdict": "الناتج",
          "correction": "```text\n9\n920\n20\n```"
        }
      }
    ]
  }
];
