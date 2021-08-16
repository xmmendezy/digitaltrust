<template>
	<table v-if="treeData.name">
		<tr>
			<td
				:colspan="treeData.children ? treeData.children.length * 2 : 1"
				:class="{ parentLevel: treeData.children }"
			>
				<div class="node">
					<div class="person">
						<div class="avat">
							<i class="fas fa-user-circle CS"></i>
						</div>

						<div class="name">
							{{ treeData.name }}
						</div>

						<div v-if="treeData.description" class="description">
							{{ treeData.description }}
						</div>
					</div>
				</div>
			</td>
		</tr>
		<tr v-if="treeData.children">
			<td v-for="(children, index) in treeData.children" :key="index" colspan="2" class="childLevel">
				<BinaryTree :json="children" @click-node="$emit('click-node', $event)" />
			</td>
		</tr>
	</table>
</template>

<script>
export default {
	name: 'BinaryTree',
	props: ['json'],
	data() {
		return {
			treeData: {},
		};
	},
	watch: {
		json: {
			handler: function (Props) {
				if (Props) {
					this.treeData = Props;
				}
			},
			immediate: true,
		},
	},
	methods: {
		toggleExtend: function (treeData) {
			treeData.extend = !treeData.extend;
			this.$forceUpdate();
		},
	},
};
</script>

<style lang="scss" scoped>
table {
	margin: auto;
	border-collapse: separate !important;
	border-spacing: 0 !important;
}
td {
	position: relative;
	vertical-align: top;
	text-align: center;
}

.parentLevel {
	padding-bottom: 2rem;
}

.parentLevel::after {
	content: '';
	position: absolute;
	left: 50%;
	bottom: 15px;
	height: 15px;
	border-left: 2px solid #ccc;
	transform: translate3d(-1px, 0, 0);
}
.childLevel::before {
	content: '';
	position: absolute;
	left: 50%;
	bottom: 100%;
	height: 15px;
	border-left: 2px solid #ccc;
	transform: translate3d(-1px, 0, 0);
}
.childLevel::after {
	content: '';
	position: absolute;
	left: 0;
	right: 0;
	top: -15px;
	border-top: 2px solid #ccc;
}
.childLevel:first-child:before,
.childLevel:last-child:before {
	display: none;
}
.childLevel:first-child:after {
	left: 50%;
	height: 15px;
	border: 2px solid;
	border-color: #ccc transparent transparent #ccc;
	border-radius: 6px 0 0 0;
	transform: translate3d(1px, 0, 0);
}
.childLevel:last-child:after {
	right: 50%;
	height: 15px;
	border: 2px solid;
	border-color: #ccc #ccc transparent transparent;
	border-radius: 0 6px 0 0;
	transform: translate3d(-1px, 0, 0);
}
.childLevel:first-child.childLevel:last-child::after {
	left: auto;
	border-radius: 0;
	border-color: transparent #ccc transparent transparent;
	transform: translate3d(1px, 0, 0);
}

.node {
	position: relative;
	display: inline-block;
	width: 10rem;
	box-sizing: border-box;
	text-align: center;
}
.node .person {
	position: relative;
	display: inline-block;
	z-index: 2;
	width: 6em;
	overflow: hidden;
}
.node .person .avat {
	display: block;
	width: 4em;
	height: 4em;
	margin: auto;
	overflow: hidden;
	box-sizing: border-box;
}
.node .person .avat i {
	width: 100%;
	height: 100%;
	font-size: 4rem;
	color: white;
}
.node .person {
	.name,
	.description {
		color: white;
		line-height: 2rem;
		overflow: hidden;
		width: 100%;
	}

	.name {
		font-weight: bold;
	}
}

.landscape {
	transform: translate(-100%, 0) rotate(-90deg);
	transform-origin: 100% 0;
}
.landscape .node {
	text-align: left;
	height: 8em;
	width: 8em;
}
.landscape .person {
	position: relative;
	transform: rotate(90deg);
	padding-left: 4.5em;
	height: 4em;
	top: 4em;
	left: -1em;
}
.landscape .person .avat {
	position: absolute;
	left: 0;
}
.landscape .person .name {
	height: 4em;
	line-height: 4em;
}
</style>
