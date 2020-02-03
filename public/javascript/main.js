$("#email1").blur(() => {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  if (!emailReg.test($("#email1").val())) {
    $("#emailHelp").html(" *please enter a valid email");
    $("#emailHelp").fadeIn("100");
    $("#email1").css("border-color", "red");
  } else {
    console.log("test");
    let data = $("#email1").val();

    $.ajax({
      url: "http://localhost:8080/user/emailRegister",
      type: "POST",
      dataType: "json",
      data: {
        email: data
      }
    });
  }
});
/**
 *
 *  sticky navigation
 *
 */

let navbar = $(".navbar");

$(window).scroll(function() {
  let oTop = $(".section-2").offset().top - window.innerHeight;
  if ($(window).scrollTop() > oTop) {
    navbar.addClass("sticky");
  } else {
    navbar.removeClass("sticky");
  }
});

var countDownDate = new Date("Feb 15, 2020 00:00:00").getTime();
var myfunc = setInterval(function() {
  var now = new Date().getTime();
  var timeleft = countDownDate - now;

  var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
  var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

  document.getElementById("days").innerHTML = days + "d ";
  document.getElementById("hours").innerHTML = hours + "h ";
  document.getElementById("mins").innerHTML = minutes + "m ";
  document.getElementById("secs").innerHTML = seconds + "s ";

  if (timeleft < 0) {
    clearInterval(myfunc);
    document.getElementById("days").innerHTML = "";
    document.getElementById("hours").innerHTML = "";
    document.getElementById("mins").innerHTML = "";
    document.getElementById("secs").innerHTML = "";
    document.getElementById("end").innerHTML = "TIME UP!!";
  }
}, 1000);

var mpopup = document.getElementById("mpopupBox");

var mpLink = document.getElementById("mpopupLink");

var close = document.getElementsByClassName("close")[0];

mpLink.onclick = function() {
  mpopup.style.display = "block";
};
close.onclick = function() {
  mpopup.style.display = "none";
};

window.onclick = function(event) {
  if (event.target == mpopup) {
    mpopup.style.display = "none";
  }
};
