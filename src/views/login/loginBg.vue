
<template>
    <canvas id="myCanvas"></canvas>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const dotRadius = 1;
    const dotColor = 'rgba(255, 255, 255, 1)';
    const lineThreshold = 200; // 调整距离阈值

    class Dot {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vx = Math.random() - 0.5;
            this.vy = Math.random() - 0.5;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, dotRadius, 0, Math.PI * 2);
            ctx.fillStyle = dotColor;
            ctx.fill();
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) {
                this.vx *= -1;
            }

            if (this.y < 0 || this.y > canvas.height) {
                this.vy *= -1;
            }
        }

        connect(otherDot) {
            const distance = Math.sqrt(
                Math.pow(otherDot.x - this.x, 2) + Math.pow(otherDot.y - this.y, 2)
            );

            if (distance < lineThreshold) { // 根据距离阈值判断是否绘制线条
                const opacity = 1 - distance / lineThreshold;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(otherDot.x, otherDot.y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.stroke();
            }
        }
    }

    const dots = [];

    for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const dot = new Dot(x, y);
        dots.push(dot);
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#000000'; // 设置背景颜色为粉色
        ctx.fillRect(0, 0, canvas.width, canvas.height); // 绘制填充整个 canvas 的矩形
        for (let i = 0; i < dots.length; i++) {
            const dot = dots[i];
            dot.draw();
            dot.update();

            for (let j = i + 1; j < dots.length; j++) {
                const otherDot = dots[j];
                dot.connect(otherDot);
            }
        }

        requestAnimationFrame(animate);
    }

    animate();



})

</script>

<style lang='scss' scoped>
#myCanvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>