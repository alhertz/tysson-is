$(document).ready(function(){$("#phrase").delay(500).fadeIn(1500,function(){}),$.ajaxSetup({cache:!0}),$.getScript("//connect.facebook.net/en_UK/all.js",function(){FB.init({appId:"252765611559469"}),$("#loginbutton,#feedbutton").removeAttr("disabled"),FB.getLoginStatus()}),$.getJSON("scripts/data.json",function(a){var b=a.phrases[Math.floor(Math.random()*a.phrases.length)];$('<h1 id="caption">Tysson is '+b.caption+"</h1>").prependTo("#phrase"),$("#create").click(function(){$("#post").fadeOut(500,function(){$("#createForm").fadeIn(500)}),$("#createFormInput").on("keyup change",function(){value=this.value,$("#caption").text("Tysson is "+value)}),$("#createFormPost").click(function(){FB.ui({method:"feed",name:"TYSSON is",description:value,link:"https://tysson.is",picture:"http://i.imgur.com/uDDjkz8.jpg"},function(a){a&&a.post_id?($("#creatForm").fadeOut(500),$("#post").fadeOut(500,function(){$("#thanks").fadeIn()})):($("#createForm").fadeOut(500),$("#post").fadeOut(500,function(){$("#nope").fadeIn()}))})})}),$("#say").click(function(){FB.ui({method:"feed",name:"TYSSON is",description:b.caption,link:"https://tysson.is",picture:"http://i.imgur.com/uDDjkz8.jpg"},function(a){a&&a.post_id?($("#createForm").fadeOut(),$("#post").fadeOut(500,function(){$("#thanks").fadeIn()})):($("#createForm").fadeOut(),$("#post").fadeOut(500,function(){$("#nope").fadeIn()}))})})})});