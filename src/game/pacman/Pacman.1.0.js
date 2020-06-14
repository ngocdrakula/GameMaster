// Create by Ngocdrakula
// Start creating at 13/06/2020
// Created at ...
// Pacman Version 1.0
import React from 'react'

export default class Pacman_1_0 extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.frame = React.createRef();
        this.imgaeGhost = React.createRef();
        this.state = {
            map: [
                "0000000000000000022222222222222002002002000020200202202200202020020200222222222002020222002002000222020200202220020202022220020002020202222002000222020200202220020202220020020002020022222222200202202200202020020020220000202002222222222222200000000000000000"
            ],
            current: 0,
            point: 16,
            margin: 0,
            maxPlus: 0,
            highPlus: 0,
            colorPac: "#FFD700",
            runLevel: 0,
            statusGame: false,
            presentPlus: 0
        };
        this.data = {
            size: 30,
            step: 0.2,
            timeout: 1000,
            fps: 1
        }
        this.map = [];
        this.pacman = {}
        this.ghost = [];
    }
    componentDidMount() {
        this.checkWindowResize();
        window.addEventListener('resize', this.checkWindowResize);
        this.ctx = this.canvas.current.getContext('2d');
        this.loadMap();
    }
    checkWindowResize = () => {
        const width = this.frame.current.offsetWidth;
        const height = window.innerHeight - 51; //navbar
        const canvasSize = Math.min(width, height);
        if (canvasSize !== this.canvas.current.offsetWidth) {
            this.canvas.current.width = canvasSize;
            this.canvas.current.height = canvasSize;
            const { point, current } = this.state;
            const size = Math.floor(canvasSize / point) || 1;
            const margin = Math.floor((canvasSize - point * size) / 2);
            this.loadMap(current);
            this.data.size = size;
            this.setState({
                margin: margin
            })
        }
    }
    resetData = (statusGame) => {
        const { point} = this.state;
        const pos1 =  1.5;
        const pos2 = point - 1.5;
        const ghost = new Array(3);
        ghost[0] = [pos2, pos1, Math.floor(Math.random() * 4)];
        ghost[1] = [pos1, pos2, Math.floor(Math.random() * 4)];
        ghost[2] = [pos2, pos2, Math.floor(Math.random() * 4)];
        this.ghost = ghost;
        this.pacman = {
            x: pos1,
            y: pos1,
            direction: 1,
            status: 0,
        }
        if (!statusGame) {

        }
    }
    loadMap = (index = 0) => {
        const { map, point } = this.state;
        const dataMap = map[index];
        if (dataMap) {
            let maxPlus = 0;
            const data = new Array(point).fill(0).map((dataRow, row) => {
                dataRow = new Array(point).fill(0).map((dataCol, col) => {
                    dataCol = dataMap.slice(row * point + col, row * point + col + 1);
                    if(dataCol > 1){
                        maxPlus ++;
                    }
                    return dataCol;
                });
                return dataRow;
            });
            this.map = data;
            this.setState({
                current: index,
                maxPlus: maxPlus
            });
        }
    }
    startGame = () => {
        this.resetData();
        this.setState({
            statusGame: true
        });
        setTimeout(() => {
            this.draw();
            this.control();
        }, 1000);
    }
    draw = () => {
        this.renderMap();
        this.renderPacman();
        this.renderGhost();
        if(this.state.statusGame){
            requestAnimationFrame(this.draw)
        }
    }
    endGame = () => {
        this.setState({
            statusGame: false
        });
    }
    control = () => {
        const {timeout} = this.data;
        if(this.state.statusGame){
            setInterval(() => {
                this.controlPac();
                this.controlGhost();
                this.pacman.status = !this.pacman.status;
            }, timeout || 1000);
        }
    }
    controlGhost = () => {
        const {step} = this.data;
        this.ghost = this.ghost.map(ghost => {
            const x = ghost[0];
            const y = ghost[1]
            const direction = ghost[2];
            let ghostMoved = 0;
            if(direction % 2 === 0){
                const nextY = y + (direction - 1) * 2 * step;
                if(this.check(x - step , nextY) && this.check(x + step, nextY)){
                    ghost[1] += (direction - 1) * step;
                    ghostMoved += 1;
                }
            }
            if(direction % 2 === 1){
                const nextX = x - (direction - 2) * 2 * step;
                if(this.check(nextX, y - step) && this.check(nextX, y + step)){
                    ghost[0] += (2 - direction) * step;
                    ghostMoved += 1;
                }
            }
            if(!ghostMoved) ghost[2] = Math.floor(Math.random()*4);
            return(ghost);
        });
    }
    controlPac = () => {
        const {step} = this.data;
        let {presentPlus, highPlus, maxPlus} = this.state;
        const {x, y, direction, status} = this.pacman;

        if(x % step < .5 * step && y % step < .5 * step){
            if(this.map[Math.floor(x - .5)][Math.floor(y - .5)] == 2){
                this.map[Math.floor(x - .5)][Math.floor(y - .5)] = 1;
                presentPlus += 1;
                if(presentPlus > highPlus){
                    highPlus = presentPlus;
                }
                if(presentPlus >= maxPlus){
                    this.completeLevel();
                }
            }
        }
        if(direction % 2 === 0){
            if(this.check(x - step, y + (direction - 1) * 2 * step) >= 1 && this.check(x + step, y + (direction - 1) * 2 * step) >= 1){
                this.pacman.y += (direction - 1) * step;
            }
        }
        else{
            if(this.check(x - (direction - 2) * 2 * step, y - step) >= 1 && this.check(x - (direction - 2) * 2 * step, y + step) >= 1){
                this.pacman.x += (2 - direction) * step;
            }
        }
        if(direction % 2 === 0){
            const nextY = y + (direction - 1) * 2 * step;
            console.log('nexXt', nextY)
            console.log(this.check(x - step , nextY), this.check(x + step, nextY))
            if(this.check(x - step , nextY) && this.check(x + step, nextY)){
                this.pacman.x += (2 - direction) * step;
            }
        }
        if(direction % 2 === 1){
            const nextX = x - (direction - 2) * 2 * step;
            console.log('nexXt', nextX)
            console.log(this.check(nextX, y - step), this.check(nextX, y + step))
            if(this.check(nextX, y - step) && this.check(nextX, y + step)){
                this.pacman.y += (direction - 1) * step;
            }
        }
    }
    check = (x , y) => {
        const {point} = this.state;
        if( x < 0 || x >= point || y >= point || y < 0){
            // console.log(x, y)
            return 0;
        }
        x = Math.floor(x);
        y = Math.floor(y);
        return this.map[x][y];
    }
    renderMap = (firstData) => {
        (firstData || this.map).map((dataRow, row) => {
            dataRow.map((dataCol, col) => {
                this.renderPoint(row, col, dataCol);
            })
        })
    }
    renderPoint = (x = 0, y = 0, colorCode = 0) => {
        const { margin } = this.state;
        const { size } = this.data;
        const ctx = this.ctx
        if (ctx) {
            const color = ["black", "white", "white"];
            x = x * size + size / 2 + margin;
            y = y * size + size / 2 + margin;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y);
            ctx.lineWidth = size;
            ctx.strokeStyle = color[colorCode];
            ctx.lineCap = "square";
            ctx.stroke();
            if (colorCode === "2") {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x, y);
                ctx.lineWidth = size / 3;
                ctx.strokeStyle = "red";
                ctx.lineCap = "round";
                ctx.stroke();
            }
        }
    }
    renderGhost = () => {
        const { size } = this.data;
        const { margin } = this.state;
        const imgaeGhost = this.imgaeGhost.current;
        const ctx = this.ctx;
        if(ctx){
            this.ghost.map(ghost => {
                const xGhost = ghost[0] * size + margin - size / 2;
                const yGhost = ghost[1] * size + margin - size / 2;
                ctx.beginPath();
                ctx.drawImage(imgaeGhost, xGhost, yGhost, size, size);
            });
        }
    }
    renderPacman = () => {
        const { x, y, direction, status } = this.pacman;
        const { margin, colorPac } = this.state;
        const { size } = this.data;
        const xPac = x * size + margin;
        const yPac = y * size + margin;
        const ctx = this.ctx;
        if(ctx){
            if (status === 1) {
                ctx.beginPath();
                ctx.arc(xPac, yPac, size / 2, (direction / 2 + 0.25) * Math.PI, (direction / 2 + 1.25) * Math.PI);
                ctx.fillStyle = colorPac;
                ctx.fill();
    
                ctx.beginPath();
                ctx.arc(xPac, yPac, size / 2, (direction / 2 - 0.25) * Math.PI, (direction / 2 - 1.25) * Math.PI);
                ctx.fillStyle = colorPac;
                ctx.fill();
            }
            else{
                ctx.beginPath();
                ctx.arc(xPac, yPac, size / 2, 0, 2 * Math.PI);
                ctx.fillStyle = colorPac;
                ctx.fill();
            };
        }
    }
    render() {
        const {pacman, ghost, data, map} = this;
        console.log('this.state', {pacman, ghost, data, map})
        console.log('this.state', this.state);
        return (
            <React.Fragment>
                <div className="row overflow-hidden">
                    <div className="col-lg-3 d-none d-lg-block">
                        Cai nay se an khi xai dien thoai
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 px-0">
                        <div ref={this.frame} className="d-flex justify-content-center align-items-center">
                            <canvas ref={this.canvas} width="120" height="120">
                                Thiết bị của bạn không hỗ trợ loại game này
                            </canvas>
                        </div>
                    </div>
                    <div className="col-lg-3 d-none d-lg-block">
                        Cai nay cung an khi xai dien thoai
                    </div>
                </div>
                <div
                    className="fixed-top d-flex justify-content-center align-items-center"
                    style={{
                        top: "200px",
                        height: this.state.statusGame ? "0%" : "auto",
                        maxWidth: "200px",
                        margin: "auto",
                        overflow: "hidden"
                    }}
                >
                    <div className="waiting"
                        style={{
                            maxWidth: "200px"
                        }}
                    >
                        Ban co muon choi k <button onClick={this.startGame}>Chơi</button>
                    </div>
                </div>
                <div className="d-none">
                    <img ref={this.imgaeGhost} src="/img/icon/ghost.PNG" />
                </div>
            </React.Fragment>
        )
    }
}