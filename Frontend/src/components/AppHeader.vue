<template>
  <nav class="navbar navbar-expand bg-dark">
    <div class="mr-auto navbar-nav col-3 justify-content-end ml-5">
      <li class="nav-item">
        <router-link :to="{ name: 'touristAttraction' }" class="nav-link h4 text-white">
          Home
          <i class="fa-solid fa-house-user"></i>
        </router-link>
      </li>
    </div>
    <div class="mr-auto navbar-nav col">
      <li class="nav-item">
        <router-link :to="{ name: 'touristAttraction' }" class="nav-link h4 text-white">
          Plan
          <i class="fa fa-book" aria-hidden="true"></i>
        </router-link>
      </li>
    </div>
    <div class="mr-auto navbar-nav col-3 justify-content-start">
      <li class="nav-item">
        <router-link :to="{ name: 'touristAttraction' }" class="nav-link h4 text-white">
          User
          <i class="fa-solid fa-user"></i>
        </router-link>
      </li>
    </div>
  </nav>
</template>