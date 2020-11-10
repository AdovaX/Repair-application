import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  $(document).ready(function(){
 let mainContent = $('.cd-main-content'),
    header = $('.cd-main-header'),
    sidebar = $('.cd-side-nav'),
    sidebarTrigger = $('.cd-nav-trigger'),
    topNavigation = $('.cd-top-nav'),
    searchForm = $('.cd-search'),
    accountInfo = $('.account');

  //on resize, move search and top nav position according to window width
  var resizing = false;
  moveNavigation();
  $(window).on('resize', function(){
    if( !resizing ) {
      (!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
      resizing = true;
    }
  });

 

  //mobile only - open sidebar when user clicks the hamburger menu
  sidebarTrigger.on('click', function(event){
    event.preventDefault();
    $([sidebar, sidebarTrigger]).toggleClass('nav-is-visible');
  });

  //click on item and show submenu
  $('.has-children > a').on('click', function(event){
    var mq = checkMQ(),
      selectedItem = $(this);
    if( mq == 'mobile' || mq == 'tablet' ) {
      event.preventDefault();
      if( selectedItem.parent('li').hasClass('selected')) {
        selectedItem.parent('li').removeClass('selected');
      } else {
        sidebar.find('.has-children.selected').removeClass('selected');
        accountInfo.removeClass('selected');
        selectedItem.parent('li').addClass('selected');
      }
    }
  });

  //click on account and show submenu - desktop version only
  accountInfo.children('a').on('click', function(event){
    var mq = checkMQ(),
      selectedItem = $(this);
    if( mq == 'desktop') {
      event.preventDefault();
      accountInfo.toggleClass('selected');
      sidebar.find('.has-children.selected').removeClass('selected');
    }
  });

  $(document).on('click', function(event){
    if( !$(event.target).is('.has-children a') ) {
      sidebar.find('.has-children.selected').removeClass('selected');
      accountInfo.removeClass('selected');
    }
  });

                            

  function checkMQ() {
    //check if mobile or desktop device
    return window.getComputedStyle(document.querySelector('.cd-main-content'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
  }

  function moveNavigation(){
      var mq = checkMQ();
        
        if ( mq == 'mobile' && topNavigation.parents('.cd-side-nav').length == 0 ) {
          detachElements();
      topNavigation.appendTo(sidebar);
      searchForm.removeClass('is-hidden').prependTo(sidebar);
    } else if ( ( mq == 'tablet' || mq == 'desktop') &&  topNavigation.parents('.cd-side-nav').length > 0 ) {
      detachElements();
      searchForm.insertAfter(header.find('.cd-logo'));
      topNavigation.appendTo(header.find('.cd-nav'));
    }
    checkSelected(mq);
    resizing = false;
  }

  function detachElements() {
    topNavigation.detach();
    searchForm.detach();
  }

  function checkSelected(mq) {
    //on desktop, remove selected class from items selected on mobile/tablet version
    if( mq == 'desktop' ) $('.has-children.selected').removeClass('selected');
  }

  function checkScrollbarPosition() {
    var mq = checkMQ();
    
    if( mq != 'mobile' ) {
      var sidebarHeight = sidebar.outerHeight(),
        windowHeight = $(window).height(),
        mainContentHeight = mainContent.outerHeight(),
        scrollTop = $(window).scrollTop();

      ( ( scrollTop + windowHeight > sidebarHeight ) && ( mainContentHeight - sidebarHeight != 0 ) ) ? sidebar.addClass('is-fixed').css('bottom', 0) : sidebar.removeClass('is-fixed').attr('style', '');
    }
    
  }
});

 


  }

}
