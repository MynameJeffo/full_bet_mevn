<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Promotion</router-link> |
      <router-link to="/memberinfo">MemberInfo </router-link> |
      <router-link to="/login">Login</router-link>
    </div>

    <!-- 
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Fubok</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/">Promotion</router-link>
          </b-nav-item>
        </b-navbar-nav>

        
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
          </b-nav-item-dropdown>
          
        <b-navbar-nav right >
          <b-nav-item href="#">Promotion</b-nav-item>
        </b-navbar-nav>
          <b-nav-item-dropdown right>
            
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar> -->
  
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
