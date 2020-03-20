## 一、JSON.stringify() 第一大特性
* undefined、任意的函数以及 symbol 作为对象属性值时 JSON.stringify() 对跳过（忽略）它们进行序列化。

        const data = {
            a: "aaa",
            b: undefined,
            c: Symbol("dd"),
            fn: function() {
                return true;
            }
        };
        JSON.stringify(data); // 输出：？

        // "{"a":"aaa"}"
* undefined、任意的函数以及 symbol 作为数组元素值时，JSON.stringify() 将会将它们序列化为 null。

        JSON.stringify(["aaa", undefined, function aa() {
            return true
        }, Symbol('dd')])  // 输出：？

        // "["aaa",null,null,null]"
* undefined、任意的函数以及 symbol 被 JSON.stringify() 作为单独的值进行序列化时，都会返回 undefined。

        JSON.stringify(function a (){console.log('a')})
        // undefined
        JSON.stringify(undefined)
        // undefined
        JSON.stringify(Symbol('dd'))
        // undefined
## 二、JSON.stringify() 第二大特性
* 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。

        const data = {
            a: "aaa",
            b: undefined,
            c: Symbol("dd"),
            fn: function() {
                return true;
            },
            d: "ddd"
        };
        JSON.stringify(data); // 输出：？
        // "{"a":"aaa","d":"ddd"}"


        JSON.stringify(["aaa", undefined, function aa() {
            return true
        }, Symbol('dd'),"eee"])  // 输出：？
        // "["aaa",null,null,null,"eee"]"
## 三、JSON.stringify() 第三大特性
* 转换值如果有 toJSON() 函数，该函数返回什么值，序列化结果就是什么值，并且忽略其他属性的值。

        JSON.stringify({
            say: "hello JSON.stringify",
            toJSON: function() {
                return "today i learn";
            }
        })
        // "today i learn"
## 四、JSON.stringify() 第四大特性
* JSON.stringify() 将会正常序列化 Date 的值。

        JSON.stringify({ now: new Date() });
        // "{"now":"2019-12-11T02:47:36.280Z"}"
## 五、JSON.stringify() 第五大特性
* NaN 和 Infinity 格式的数值及 null 都会被当做 null。

        JSON.stringify(NaN)
        // "null"
        JSON.stringify(null)
        // "null"
        JSON.stringify(Infinity)
        // "null"
## 六、JSON.stringify() 第六大特性
* 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。

        JSON.stringify([new Number(1), new String("false"), new Boolean(false)]);
        // "[1,"false",false]"
## 七、JSON.stringify() 第七大特性
* 其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性。

        // 不可枚举的属性默认会被忽略：
        JSON.stringify(
            Object.create(
                null,
                {
                    x: { value: 'json', enumerable: false },
                    y: { value: 'stringify', enumerable: true }
                }
            )
        );
        // "{"y","stringify"}"