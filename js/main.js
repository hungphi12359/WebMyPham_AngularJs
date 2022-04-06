/*  ---------------------------------------------------
    Template Name: Ogani
    Description:  Ogani eCommerce  HTML Template
    Author: Colorlib
    Author URI: https://colorlib.com
    Version: 1.0
    Created: Colorlib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");

        /*------------------
            Gallery filter
        --------------------*/
        $('.featured__controls li').on('click', function () {
            $('.featured__controls li').removeClass('active');
            $(this).addClass('active');
        });
        if ($('.featured__filter').length > 0) {
            var containerEl = document.querySelector('.featured__filter');
            var mixer = mixitup(containerEl);
        }
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Humberger Menu
    $(".humberger__open").on('click', function () {
        $(".humberger__menu__wrapper").addClass("show__humberger__menu__wrapper");
        $(".humberger__menu__overlay").addClass("active");
        $("body").addClass("over_hid");
    });

    $(".humberger__menu__overlay").on('click', function () {
        $(".humberger__menu__wrapper").removeClass("show__humberger__menu__wrapper");
        $(".humberger__menu__overlay").removeClass("active");
        $("body").removeClass("over_hid");
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*-----------------------
        Categories Slider
    ------------------------*/
    $(".categories__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 4,
        dots: false,
        nav: true,
        navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {

            0: {
                items: 1,
            },

            480: {
                items: 2,
            },

            768: {
                items: 3,
            },

            992: {
                items: 4,
            }
        }
    });


    $('.hero__categories__all').on('click', function(){
        $('.hero__categories ul').slideToggle(400);
    });

    /*--------------------------
        Latest Product Slider
    ----------------------------*/
    $(".latest-product__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*-----------------------------
        Product Discount Slider
    -------------------------------*/
    $(".product__discount__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 3,
        dots: true,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {

            320: {
                items: 1,
            },

            480: {
                items: 2,
            },

            768: {
                items: 2,
            },

            992: {
                items: 3,
            }
        }
    });

    /*---------------------------------
        Product Details Pic Slider
    ----------------------------------*/
    $(".product__details__pic__slider").owlCarousel({
        loop: true,
        margin: 20,
        items: 4,
        dots: true,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*-----------------------
		Price Range Slider
	------------------------ */
    var rangeSlider = $(".price-range"),
        minamount = $("#minamount"),
        maxamount = $("#maxamount"),
        minPrice = rangeSlider.data('min'),
        maxPrice = rangeSlider.data('max');
    rangeSlider.slider({
        range: true,
        min: minPrice,
        max: maxPrice,
        values: [minPrice, maxPrice],
        slide: function (event, ui) {
            minamount.val('$' + ui.values[0]);
            maxamount.val('$' + ui.values[1]);
        }
    });
    minamount.val('$' + rangeSlider.slider("values", 0));
    maxamount.val('$' + rangeSlider.slider("values", 1));

    /*--------------------------
        Select
    ----------------------------*/
    $("select").niceSelect();

    /*------------------
		Single Product
	--------------------*/
    $('.product__details__pic__slider img').on('click', function () {

        var imgurl = $(this).data('imgbigurl');
        var bigImg = $('.product__details__pic__item--large').attr('src');
        if (imgurl != bigImg) {
            $('.product__details__pic__item--large').attr({
                src: imgurl
            });
        }
    });

    /*-------------------
		Quantity change
	--------------------- */
    var proQty = $('.pro-qty');
    proQty.prepend('<span class="dec qtybtn">-</span>');
    proQty.append('<span class="inc qtybtn">+</span>');
    proQty.on('click', '.qtybtn', function () {
        var $button = $(this);
        var oldValue = $button.parent().find('input').val();
        if ($button.hasClass('inc')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        $button.parent().find('input').val(newVal);
    });

})(jQuery);

var config = {
    apiKey: "AIzaSyCtUowZmQmUEDoBfZHaMG806FK4p6pPFAg",
  authDomain: "hungphicometics.firebaseapp.com",
  databaseURL: "https://hungphicometics-default-rtdb.firebaseio.com",
  projectId: "hungphicometics",
  storageBucket: "hungphicometics.appspot.com",
  messagingSenderId: "6696749950",
  appId: "1:6696749950:web:1bd7ab628fed00646a812f",
  measurementId: "G-1N4HB8K296"
  };

  firebase.initializeApp(config);


  var app = angular.module("myApp", ['firebase']);
  app.controller("myCtrl", ["$scope", "$firebaseArray",
  function($scope, $firebaseArray) {
    var ref = firebase.database().ref("DanhMuc");
    $scope.danhmuc = $firebaseArray(ref);
  
  },


]);

app.controller("SanPhamCtrl", ["$scope", "$firebaseArray","$firebaseStorage",
function($scope, $firebaseArray,$firebaseStorage) {
    var ref2 = firebase.database().ref("sanpham");
    $scope.products = $firebaseArray(ref2);
    $scope.index = -1;
    $scope.insert = function() {
       
        $scope.upload()
        $scope.products.$add({
                tenSP: $scope.tenSP,
                sex: $scope.sex,
                tinhtrang: $scope.tinhtrang,
                mota: $scope.mota,
             
                cannang: $scope.cannang,
                thongtin: $scope.thongtin,
                danhmuc: $scope.danhmuc,
                gia: $scope.gia,
            })
           
      

    }
    $scope.update = function() {
        $scope.upload()
        setTimeout(() => {
            $scope.products[$scope.index] = angular.copy($scope.product);
            $scope.products.$save($scope.index)
        }, 1000)

    }
    $scope.delete = function() {
        if (confirm("Bạn có muốn xóa không?") == true) {
            $scope.deleteImg();
            $scope.products.$remove($scope.index)
            $scope.clear();
            alert("Đã xóa")
        }

    }
    $scope.cancel = function() {
        if ($scope.index == -1) {
            $scope.clear();
        } else {
            $scope.edit($scope.index);
        }
    }

    $scope.edit = function (index){
        alert(index)
     $scope.index = index;
     $scope.product = angular.copy($scope.products[index]);
     console.log($scope.product)
}


    $scope.upload = function() {
        var input = document.getElementById("file");
        var file = input.files[0];
        if (file) {
            $scope.deleteImg();
            var name = Math.floor(Math.random() * 899999) + 100000;
            var storageRef = firebase.storage().ref("images/products/" + name);
            $scope.storage = $firebaseStorage(storageRef);

            var uploadTask = $scope.storage.$put(file, {
                contentType: "image/jpeg"
            });

            $scope.hinh = name;
            setTimeout(() => {
                $scope.storage.$getDownloadURL().then(function(url) {
                    $scope.product.imageUrl = url;
                });
            }, 500)
        }
    },

    $scope.deleteImg = function() {
        if ($scope.hinh != undefined) {
            var storageRef = firebase.storage().ref("images/products/" + $scope.hinh);
            $scope.storage = $firebaseStorage(storageRef);
            $scope.storage.$delete().then(function() {
                console.log("successfully deleted!");
            })
        }
    },
    $scope.clear = function() {
        $scope.product = {};
        document.getElementById("file").value = "";
        $scope.index = -1;
    }



},


]);

