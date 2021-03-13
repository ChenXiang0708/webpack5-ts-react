import hello from '@/hello'
import {work,run} from '@/hello2'
import '@/assets/style/style.css'
import '@/assets/style/index.scss'
import banner from './assets/images/banner.png'

enum a {
	'周日',
	'周一',
	'周二',
	'周三',
	'周四',
	'周五',
	'周六',
}

console.log(a);
hello.sayHello("world")
work()

function creatElement(){
	console.log(hello)
	
	const app = document.getElementById("app");
	let Odiv = document.createElement('div')
	Odiv.setAttribute('class','font-size-16 color-000 t-center')
	Odiv.innerHTML='hello world'

	const Oimg = document.createElement('img')
	Oimg.setAttribute('src',banner)

	let Odiv2 = document.createElement('div')
	Odiv2.setAttribute('class','wid100 hei100 border translate')
	Odiv2.innerHTML='hello world2'

	app?.appendChild(Odiv)
	app?.appendChild(Oimg)
	app?.appendChild(Odiv2)
}
creatElement()

let str = '   a   b    '
console.log(str.trim());

let str2 = '1'
console.log(str2.padStart(3,'0'))

class Animate{
	name:string
	constructor(name:string){
		this.name = name
	}
	eat(){
		console.log(this.name + ' eatting');
	}
}
const cat = new Animate('cat')
cat.eat()