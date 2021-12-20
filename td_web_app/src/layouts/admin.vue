<template>
	<div class="admin">
		<div class="card card-main">
			<header class="card-header">
				<figure class="image is-64x64 logo">
					<img alt="TradingDigital" src="../assets/logo.png" />
				</figure>
				<p class="card-header-title">TradingDigital - Admin</p>
				<AdminHeader class="is-hidden-mobile" />
			</header>
			<div class="card-content">
				<AdminHeader class="is-hidden-tablet" />
				<router-view />
			</div>
		</div>
	</div>
	<a class="button is-floating" href="https://t.me/tradingdigitalschool" target="_blank">
		<i class="fab fa-telegram-plane"></i>
	</a>
</template>
