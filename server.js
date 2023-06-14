var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var express = require("express");
var axios = require("axios");
var app = express();
app.use(express.json());
var findData = function (obj, targetValue) {
    for (var key in obj) {
        if (obj[key] === targetValue) {
            return obj;
        }
        else if (typeof obj[key] === "object") {
            var nestVal = findData(obj[key], targetValue);
            if (nestVal !== undefined) {
                return nestVal;
            }
        }
        else if (Array.isArray(obj[key])) {
            for (var _i = 0, _a = obj[key]; _i < _a.length; _i++) {
                var value = _a[_i];
                if (value === targetValue) {
                    return obj[key];
                }
                else if (typeof value === "object") {
                    for (var nestedKey in value) {
                        if (value[nestedKey] === targetValue) {
                            return value;
                        }
                        else if (typeof value[nestedKey] === "object") {
                            var nestedVal = findData(value[nestedKey], targetValue);
                            if (nestedVal !== undefined) {
                                return nestedVal;
                            }
                        }
                        else if (Array.isArray(value[nestedKey])) {
                            for (var _b = 0, _c = value[nestedKey]; _b < _c.length; _b++) {
                                var arrayValue = _c[_b];
                                if (arrayValue === targetValue) {
                                    return value[nestedKey];
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return undefined;
};
var searchData = function () {
    return axios.get("https://serpapi.com/search?engine=google_maps", {
        params: {
            q: "coffee",
            api_key: "6767f3b8aa507a5819bdb55c995a451e2e3d4f4a0fc258c187b6aa2ba68577d9",
            engine: "google",
        },
    });
};
app.post("/", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var response, givenString, searchObject, responseData, error_1, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, searchData()];
            case 1:
                response = _a.sent();
                givenString = req.body;
                searchObject = findData(response.data, givenString);
                if (!searchObject) {
                    console.log("Value not found");
                }
                else {
                    console.log(searchObject);
                }
                responseData = { message: "Request received successfully" };
                return [2 /*return*/, res.status(200).json(responseData)];
            case 2:
                error_1 = _a.sent();
                err = error_1;
                return [2 /*return*/, res.status(500).json({ error: err.message })];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.listen(6000, function () {
    console.log("Server is running on port 6000");
});
