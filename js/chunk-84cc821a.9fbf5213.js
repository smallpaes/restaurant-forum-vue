(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-84cc821a"],{"12b2":function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.isLoading?r("Spinner"):r("form",{directives:[{name:"show",rawName:"v-show",value:!e.isLoading,expression:"!isLoading"}],on:{submit:function(t){return t.stopPropagation(),t.preventDefault(),e.handleSubmit(t)}}},[r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"name"}},[e._v("Name")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.restaurant.name,expression:"restaurant.name"}],staticClass:"form-control",attrs:{id:"name",type:"text",name:"name",placeholder:"Enter name",required:""},domProps:{value:e.restaurant.name},on:{input:function(t){t.target.composing||e.$set(e.restaurant,"name",t.target.value)}}})]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"categoryId"}},[e._v("Category")]),r("select",{directives:[{name:"model",rawName:"v-model",value:e.restaurant.categoryId,expression:"restaurant.categoryId"}],staticClass:"form-control",attrs:{id:"categoryId",name:"categoryId",required:""},on:{change:function(t){var r=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t});e.$set(e.restaurant,"categoryId",t.target.multiple?r:r[0])}}},[r("option",{attrs:{value:"",selected:"",disabled:""}},[e._v("--請選擇--")]),e._l(e.categories,function(t){return r("option",{key:t.id,domProps:{value:t.id}},[e._v(e._s(t.name))])})],2)]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"tel"}},[e._v("Tel")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.restaurant.tel,expression:"restaurant.tel"}],staticClass:"form-control",attrs:{id:"tel",type:"text",name:"tel",placeholder:"Enter telephone number"},domProps:{value:e.restaurant.tel},on:{input:function(t){t.target.composing||e.$set(e.restaurant,"tel",t.target.value)}}})]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"address"}},[e._v("Address")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.restaurant.address,expression:"restaurant.address"}],staticClass:"form-control",attrs:{id:"address",type:"text",placeholder:"Enter address",name:"address"},domProps:{value:e.restaurant.address},on:{input:function(t){t.target.composing||e.$set(e.restaurant,"address",t.target.value)}}})]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"opening-hours"}},[e._v("Opening Hours")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.restaurant.openingHours,expression:"restaurant.openingHours"}],staticClass:"form-control",attrs:{id:"opening-hours",type:"time",name:"opening_hours"},domProps:{value:e.restaurant.openingHours},on:{input:function(t){t.target.composing||e.$set(e.restaurant,"openingHours",t.target.value)}}})]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"description"}},[e._v("Description")]),r("textarea",{directives:[{name:"model",rawName:"v-model",value:e.restaurant.description,expression:"restaurant.description"}],staticClass:"form-control",attrs:{id:"description",rows:"3",name:"description"},domProps:{value:e.restaurant.description},on:{input:function(t){t.target.composing||e.$set(e.restaurant,"description",t.target.value)}}})]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"image"}},[e._v("Image")]),e.restaurant.image?r("img",{staticClass:"d-block img-thumbnail mb-3",attrs:{src:e.restaurant.image,width:"200",height:"200"}}):e._e(),r("input",{staticClass:"form-control-file",attrs:{id:"image",type:"file",name:"image",accept:"image/*"},on:{change:e.handleFileChange}})]),r("button",{staticClass:"btn btn-primary",attrs:{type:"submit",disabled:e.isProcessing}},[e._v(e._s(e.isProcessing?"處理中":"送出"))])])},n=[],s=(r("8e6e"),r("ac6a"),r("456d"),r("7f7f"),r("96cf"),r("3b8d")),i=r("bd86"),o=r("be6c"),u=r("2fa3"),c=r("2375");function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,a)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(r,!0).forEach(function(t){Object(i["a"])(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var p={components:{Spinner:c["a"]},props:{initialRestaurant:{type:Object,default:function(){return{name:"",categoryId:"",tel:"",address:"",description:"",image:"",openingHours:""}}},isProcessing:{type:Boolean,default:!1}},data:function(){return{restaurant:{name:"",categoryId:"",tel:"",address:"",description:"",image:"",openingHours:""},categories:[],isLoading:!0}},watch:{initialRestaurant:function(e){this.restaurant=d({},this.restaurant,{},e)}},created:function(){this.fetchCategories(),this.restaurant=d({},this.restaurant,{},this.initialRestaurant)},methods:{fetchCategories:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(){var t,r,a,n,s=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=s.length>0&&void 0!==s[0]?s[0]:null,e.prev=1,e.next=4,o["a"].categories.get({page:t});case 4:if(r=e.sent,a=r.data,n=r.statusText,"OK"===n){e.next=9;break}throw new Error(n);case 9:this.categories=a.categories,this.isLoading=!1,e.next=17;break;case 13:e.prev=13,e.t0=e["catch"](1),this.isLoading=!1,u["a"].fire({type:"error",title:"Cannot get restaurant categories, please try again later"});case 17:case"end":return e.stop()}},e,this,[[1,13]])}));function t(){return e.apply(this,arguments)}return t}(),handleFileChange:function(e){var t=e.target.files;if(t.length){var r=window.URL.createObjectURL(t[0]);this.restaurant.image=r}},handleSubmit:function(e){if(this.restaurant.name)if(this.restaurant.categoryId){var t=e.target,r=new FormData(t);this.$emit("after-submit",r)}else u["a"].fire({type:"error",title:"Please choose a category"});else u["a"].fire({type:"error",title:"Please enter your name"})}}},m=p,g=r("2877"),f=Object(g["a"])(m,a,n,!1,null,null,null);t["a"]=f.exports},2743:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"container py-5"},[r("AdminRestaurantForm",{attrs:{"is-processing":e.isProcessing},on:{"after-submit":e.handleAfterSubmit}})],1)},n=[],s=(r("96cf"),r("3b8d")),i=r("12b2"),o=r("be6c"),u=r("2fa3"),c={data:function(){return{isProcessing:!1}},components:{AdminRestaurantForm:i["a"]},methods:{handleAfterSubmit:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(t){var r,a,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.isProcessing=!0,e.next=4,o["a"].restaurants.create({formData:t});case 4:if(r=e.sent,a=r.data,n=r.statusText,"OK"===n&&"success"===a.status){e.next=9;break}throw new Error(n);case 9:this.$router.push({name:"admin-restaurants"}),e.next=16;break;case 12:e.prev=12,e.t0=e["catch"](0),this.isProcessing=!1,u["a"].fire({type:"error",title:"Cannot create this restaurant, please try again later"});case 16:case"end":return e.stop()}},e,this,[[0,12]])}));function t(t){return e.apply(this,arguments)}return t}()}},l=c,d=r("2877"),p=Object(d["a"])(l,a,n,!1,null,null,null);t["default"]=p.exports},be6c:function(e,t,r){"use strict";r("7f7f"),r("6b54");var a=r("2fa3");t["a"]={categories:{get:function(e){var t=e.page,r=t?new URLSearchParams({page:t}):"page=0";return a["b"].get("/admin/categories?".concat(r.toString()))},create:function(e){var t=e.name;return a["b"].post("/admin/categories",{name:t})},update:function(e){var t=e.categoryId,r=e.name;return a["b"].put("/admin/categories/".concat(t),{name:r})},delete:function(e){var t=e.categoryId;return a["b"].delete("/admin/categories/".concat(t))}},restaurants:{create:function(e){var t=e.formData;return a["b"].post("/admin/restaurants",t)},get:function(e){var t=e.page,r=new URLSearchParams({page:t});return a["b"].get("/admin/restaurants?".concat(r.toString()))},getDetail:function(e){var t=e.restaurantId;return a["b"].get("/admin/restaurants/".concat(t))},update:function(e){var t=e.restaurantId,r=e.formData;return a["b"].put("/admin/restaurants/".concat(t),r)},delete:function(e){var t=e.restaurantId;return a["b"].delete("/admin/restaurants/".concat(t))}},users:{get:function(e){var t=e.page,r=new URLSearchParams({page:t});return a["b"].get("/admin/users?".concat(r.toString()))},update:function(e){var t=e.userId;return a["b"].put("/admin/users/".concat(t))}}}}}]);
//# sourceMappingURL=chunk-84cc821a.9fbf5213.js.map