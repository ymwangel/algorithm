<template>
  <ul>
    <li a href="#/hashTest">turn yellow</li>
    <li a href="#/blue">turn blue</li>
    <li a href="#/green">turn green</li>
  </ul>
</template>
<script>
export default {
  name: 'HashTest',
  mounted() {
    class Routers {
        constructor() {
            this.routes = {}
            this.currentUrl  = ''
            this.refresh = this.refresh.bind(this)
            window.addEventListener('load', this.refresh, false)
            window.addEventListener('hashchange', this.refresh, false)
        }
        route(path, callback) {
            this.routes[path] = callback || function() {}
        }
        refresh() {
            debugger
            this.currentUrl = location.hash.slice('1') || '/'
            this.routes[this.currentUrl]()
        }
    }
    window.Router = new Routers();
    var content = document.querySelector('body');

    function changeBgColor(color) {
        content.style.backgroundColor = color;
    }
    Router.route('/hashTest', function() {
        changeBgColor('yellow');
    });
    Router.route('/blue', function() {
        changeBgColor('blue');
    });
    Router.route('/green', function() {
        changeBgColor('green');
    });
  }
}
</script>
