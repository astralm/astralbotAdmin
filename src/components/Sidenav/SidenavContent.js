import React from 'react';
import { Link, hashHistory } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import 'jquery-slimscroll/jquery.slimscroll.min';


class SidebarContent extends React.Component {

  componentDidMount() {
    const nav = this.nav;
    const $nav = $(nav);

    // scroll
    $nav.slimscroll({
      height: '100%'
    });


    // Append icon to submenu
    // Append to child `div`
    $nav.find('.prepend-icon').children('div').prepend('<i class="material-icons">keyboard_arrow_right</i>');


    // AccordionNav
    const slideTime = 250;
    const $lists = $nav.find('ul').parent('li');
    $lists.append('<i class="material-icons icon-has-ul"></i>');
    const $As = $lists.children('a');

    // Disable A link that has ul
    $As.on('click', event => event.preventDefault());

    // Accordion nav
    $nav.on('click', (e) => {

      const target = e.target;
      const $parentLi = $(target).closest('li'); // closest, insead of parent, so it still works when click on i icons
      if (!$parentLi.length) return; // return if doesn't click on li
      const $subUl = $parentLi.children('ul');


      // let depth = $subUl.parents().length; // but some li has no sub ul, so...
      const depth = $parentLi.parents().length + 1;

      // filter out all elements (except target) at current depth or greater
      const allAtDepth = $nav.find('ul').filter(function () {
        if ($(this).parents().length >= depth && this !== $subUl.get(0)) {
          return true;
        }
        return false;
      });
      allAtDepth.slideUp(slideTime).closest('li').removeClass('open');

      // Toggle target
      if ($parentLi.has('ul').length) {
        $parentLi.toggleClass('open');
      }
      $subUl.stop().slideToggle(slideTime);

    });


    // HighlightActiveItems
    const $links = $nav.find('a');
    const currentLocation = hashHistory.getCurrentLocation();

    function highlightActive(pathname) {
      const path = `#${pathname}`;



      $links.each((i, link) => {
        const $link = $(link);
        const $li = $link.parent('li');
        const href = $link.attr('href');
        // console.log(href);

        if ($li.hasClass('active')) {
          $li.removeClass('active');
        }
        if (path.indexOf(href) === 0) {
          $li.addClass('active');
        }
      });
    }
    highlightActive(currentLocation.pathname);
    hashHistory.listen((location) => {
      highlightActive(location.pathname);
    });
  }


  render() {
      const FlatStyle = {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
      };
      const DisplayBlock = {
          display:'block'
      };
      const  tac = {
          textAlign:'center',
          marginRight:0
      };
    return (
        <ul className="nav" ref={(c) => { this.nav = c; }}>
          <li className="open">
            <FlatButton href="/" >
              <div style={tac}>
                <i style={tac} className="nav-icon material-icons">folder_open</i>
              </div>
              <div style={FlatStyle}>
                <span className="nav-text">Сессии</span>
              </div>
            </FlatButton>
            <ul style={DisplayBlock}>
                <li><FlatButton  href="#/app">
                  <span>Все сессии</span></FlatButton></li>
                <li><FlatButton href="#/app/dialog"><span>Последняя</span></FlatButton></li>
            </ul>
          </li>
          <li >
            <FlatButton href="#/app/clients" >
              <div style={tac}>
                <i style={tac} className="nav-icon material-icons">people</i>
              </div>
              <div style={FlatStyle}>
                <span className="nav-text">Клиенты</span>
              </div>
            </FlatButton>
            <ul style={DisplayBlock}>
                <li><FlatButton  href="#/app/clients">
                  <span>Все клиенты</span></FlatButton></li>
                <li><FlatButton href="#/app/client"><span>Последний</span></FlatButton></li>
            </ul>
          </li>
          <li>
            <FlatButton href="#/app/administrators" >
              <div style={tac}>
                <i style={tac} className="nav-icon material-icons">face</i>

              </div>
              <div style={FlatStyle}>
                <span className="nav-text">Администраторы</span>
              </div>
            </FlatButton>
          </li>
          <li>
            <FlatButton href="#/app/profile">
              <div style={tac}>
                <i style={tac} className="nav-icon material-icons">settings applications</i>
              </div>
              <div style={FlatStyle}>
                <span className="nav-text">Профиль</span>
              </div>
            </FlatButton>
          </li>
          <li>
            <FlatButton href="#/app/dispatch">
              <div style={tac}>
                <i style={tac} className="nav-icon material-icons">volume_up</i>
              </div>
              <div style={FlatStyle}>
                <span className="nav-text">Рассылка</span>
              </div>
            </FlatButton>
          </li>
        </ul>

  );
  }
}

module.exports = SidebarContent;
