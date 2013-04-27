(function() {
var templates = {};
templates["error.html"] = (function() {
function root(env, context, frame, runtime) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"error\">\n  <h1>Uh oh - something is not right about the configuration of this General Store!</h1>\n  <p>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"message", env.autoesc), env.autoesc);
output += "</p>\n</div>\n";
return output;
} catch (e) {
  runtime.handleError(e, lineno, colno);
}
}
return {
root: root
};

})();
templates["inventory.html"] = (function() {
function root(env, context, frame, runtime) {
var lineno = null;
var colno = null;
var output = "";
try {
frame = frame.push();
var t_2 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"inventory", env.autoesc);
if(t_2 !== undefined) {for(var t_1=0; t_1 < t_2.length; t_1++) {
var t_3 = t_2[t_1];
frame.set("i", t_3);
output += "\n  <li id=\"inventory-";
output += runtime.suppressValue(t_3, env.autoesc);
output += "\"><img src=\"media/images/inventory/";
output += runtime.suppressValue(t_3, env.autoesc);
output += ".png\">\n    <span>";
output += runtime.suppressValue(t_3, env.autoesc);
output += "</span>\n  </li>\n";
}
}frame = frame.pop();
output += "\n";
return output;
} catch (e) {
  runtime.handleError(e, lineno, colno);
}
}
return {
root: root
};

})();
templates["level.html"] = (function() {
function root(env, context, frame, runtime) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"game-wrapper level-";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"level", env.autoesc), env.autoesc);
output += "\"\n     style=\"width: ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"defaults", env.autoesc)),"width", env.autoesc), env.autoesc);
output += "px; height: ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"defaults", env.autoesc)),"height", env.autoesc), env.autoesc);
output += "px;\n            background-image: url(media/images/backgrounds/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"backgroundImage", env.autoesc), env.autoesc);
output += ");\">\n  <div class=\"game-content\">\n    <a href=\"javascript:;\" id=\"inventory\" data-action=\"inventory-show\">\n      <span>inventory</span>\n    </a>\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"defaults", env.autoesc)),"showDescription", env.autoesc) && runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"description", env.autoesc)),"length", env.autoesc) > 0) {
output += "\n      <div class=\"description\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"description", env.autoesc), env.autoesc);
output += "</div>\n    ";
}
output += "\n    ";
frame = frame.push();
var t_2 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"items", env.autoesc);
if(t_2 !== undefined) {var t_1;
if (runtime.isArray(t_2)) {
for (t_1=0; t_1 < t_2.length; t_1++) {
var t_3 = t_2[t_1][0]
frame.set("k", t_2[t_1][0]);
var t_4 = t_2[t_1][1]
frame.set("v", t_2[t_1][1]);
output += "\n      <img src=\"media/images/items/";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"items", env.autoesc)),t_3, env.autoesc)),"image", env.autoesc), env.autoesc);
output += "\" data-action=\"item\"\n           class=\"item\" id=\"";
output += runtime.suppressValue(t_3, env.autoesc);
output += "\"\n           style=\"left: ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"items", env.autoesc)),t_3, env.autoesc)),"left", env.autoesc), env.autoesc);
output += "px; top: ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"items", env.autoesc)),t_3, env.autoesc)),"top", env.autoesc), env.autoesc);
output += "px;\">\n    ";
}
} else {
t_1 = -1;
for(var t_5 in t_2) {
t_1++;
var t_6 = t_2[t_5];
frame.set("k", t_5);
frame.set("v", t_6);
output += "\n      <img src=\"media/images/items/";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"items", env.autoesc)),t_5, env.autoesc)),"image", env.autoesc), env.autoesc);
output += "\" data-action=\"item\"\n           class=\"item\" id=\"";
output += runtime.suppressValue(t_5, env.autoesc);
output += "\"\n           style=\"left: ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"items", env.autoesc)),t_5, env.autoesc)),"left", env.autoesc), env.autoesc);
output += "px; top: ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"items", env.autoesc)),t_5, env.autoesc)),"top", env.autoesc), env.autoesc);
output += "px;\">\n    ";
}
}
}frame = frame.pop();
output += "\n    ";
frame = frame.push();
var t_8 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"characters", env.autoesc);
if(t_8 !== undefined) {var t_7;
if (runtime.isArray(t_8)) {
for (t_7=0; t_7 < t_8.length; t_7++) {
var t_9 = t_8[t_7][0]
frame.set("k", t_8[t_7][0]);
var t_10 = t_8[t_7][1]
frame.set("v", t_8[t_7][1]);
output += "\n      <img src=\"media/images/characters/";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"characters", env.autoesc)),t_9, env.autoesc)),"image", env.autoesc), env.autoesc);
output += "\" data-action=\"character\"\n           class=\"character\" id=\"";
output += runtime.suppressValue(t_9, env.autoesc);
output += "\"\n           style=\"left: ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"characters", env.autoesc)),t_9, env.autoesc)),"left", env.autoesc), env.autoesc);
output += "px; top: ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"characters", env.autoesc)),t_9, env.autoesc)),"top", env.autoesc), env.autoesc);
output += "px;\">\n    ";
}
} else {
t_7 = -1;
for(var t_11 in t_8) {
t_7++;
var t_12 = t_8[t_11];
frame.set("k", t_11);
frame.set("v", t_12);
output += "\n      <img src=\"media/images/characters/";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"characters", env.autoesc)),t_11, env.autoesc)),"image", env.autoesc), env.autoesc);
output += "\" data-action=\"character\"\n           class=\"character\" id=\"";
output += runtime.suppressValue(t_11, env.autoesc);
output += "\"\n           style=\"left: ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"characters", env.autoesc)),t_11, env.autoesc)),"left", env.autoesc), env.autoesc);
output += "px; top: ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"characters", env.autoesc)),t_11, env.autoesc)),"top", env.autoesc), env.autoesc);
output += "px;\">\n    ";
}
}
}frame = frame.pop();
output += "\n    <div id=\"message\"></div>\n    <div id=\"inventory-screen\" class=\"hidden\">\n      <h2>inventory</h2>\n      <a href=\"javascript:;\" data-action=\"inventory-hide\" class=\"close\">close</a>\n      <ul id=\"inventory-items\">\n        ";
var includeTemplate = env.getTemplate("inventory.html");
output += includeTemplate.render(context.getVariables(), frame.push());
output += "\n      </ul>\n    </div>\n    <div id=\"inventory-notify\" class=\"hidden\" data-action=\"inventory-notify\">\n      <p data-action=\"inventory-notify\">New inventory!</p>\n      <img src=\"\" data-action=\"inventory-notify\">\n    </div>\n  </div>\n</div>\n";
return output;
} catch (e) {
  runtime.handleError(e, lineno, colno);
}
}
return {
root: root
};

})();
if(typeof define === "function" && define.amd) {
    define(["nunjucks"], function(nunjucks) {
        nunjucks.env = new nunjucks.Environment([], null);
        nunjucks.env.registerPrecompiled(templates);
        return nunjucks;
    });
}
else if(typeof nunjucks === "object") {
    nunjucks.env = new nunjucks.Environment([], null);
    nunjucks.env.registerPrecompiled(templates);
}
else {
    console.error("ERROR: You must load nunjucks before the precompiled templates");
}
})();
