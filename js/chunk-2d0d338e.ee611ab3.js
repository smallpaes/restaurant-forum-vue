(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d338e"],{"5c9c":function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"row"},[s("div",{staticClass:"auth-form-container shadow-sm mt-5"},[e._m(0),s("form",{staticClass:"form-signup bg-white",on:{submit:function(t){return t.stopPropagation(),t.preventDefault(),e.handleSubmit(t)}}},[s("div",{staticClass:"form-group"},[e._m(1),s("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],staticClass:"form-control",attrs:{id:"name",name:"name",type:"text",required:"",autofocus:""},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value)}}})]),s("div",{staticClass:"form-group"},[e._m(2),s("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],staticClass:"form-control",attrs:{id:"email",name:"email",type:"email",required:""},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value)}}})]),s("div",{staticClass:"form-group"},[e._m(3),s("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"form-control",attrs:{id:"password",name:"password",type:"password",required:""},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}})]),s("div",{staticClass:"form-group"},[e._m(4),s("input",{directives:[{name:"model",rawName:"v-model",value:e.passwordCheck,expression:"passwordCheck"}],staticClass:"form-control",attrs:{id:"password-check",name:"passwordCheck",type:"password",required:""},domProps:{value:e.passwordCheck},on:{input:function(t){t.target.composing||(e.passwordCheck=t.target.value)}}})]),s("div",{staticClass:"buttons sign-up-buttons text-center"},[s("button",{staticClass:"btn mx-2 signup w-50",attrs:{disabled:e.isProcessing,type:"submit"}},[e._v("Sign Up")]),s("router-link",{staticClass:"btn login w-50 mt-1",attrs:{to:"/signin"}},[e._v("Sign In")])],1)])])])},r=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"cover-photo"},[s("div",{staticClass:"overlay"}),s("h2",[e._v("Sign Up")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("label",{staticClass:"m-0 text-secondary",attrs:{for:"name"}},[s("small",[e._v("Name")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("label",{staticClass:"m-0 text-secondary",attrs:{for:"email"}},[s("small",[e._v("Email")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("label",{staticClass:"m-0 text-secondary",attrs:{for:"password"}},[s("small",[e._v("Password")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("label",{staticClass:"m-0 text-secondary",attrs:{for:"password-check"}},[s("small",[e._v("Password Check")])])}],i=(s("7f7f"),s("96cf"),s("3b8d")),n=s("7696"),o=s("2fa3"),c={name:"SignUp",data:function(){return{name:"",email:"",password:"",passwordCheck:"",isProcessing:!1}},methods:{handleSubmit:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(t){var s,a,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(this.name&&this.email&&this.password&&this.passwordCheck){e.next=3;break}return o["a"].fire({type:"error",title:"You have missed some fields, please enter all the info "}),e.abrupt("return");case 3:if(this.password===this.passwordCheck){e.next=6;break}return o["a"].fire({type:"error",title:"Passwords do not match"}),e.abrupt("return");case 6:return this.isProcessing=!0,e.prev=7,e.next=10,n["a"].signUp({name:this.name,email:this.email,password:this.password,passwordCheck:this.passwordCheck});case 10:if(s=e.sent,a=s.data,r=s.statusText,"OK"===r&&"success"===a.status){e.next=15;break}throw new Error(r);case 15:this.$router.push({name:"sign-in"}),e.next=22;break;case 18:e.prev=18,e.t0=e["catch"](7),this.isProcessing=!1,o["a"].fire({type:"error",title:"Signup failed, please try again later"});case 22:case"end":return e.stop()}},e,this,[[7,18]])}));function t(t){return e.apply(this,arguments)}return t}()}},l=c,m=s("2877"),u=Object(m["a"])(l,a,r,!1,null,null,null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d0d338e.ee611ab3.js.map