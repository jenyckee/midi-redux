import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { control } from '../redux/modules/midi'

import PIXI from "pixi.js"


export class Grid extends React.Component<void, Props, void> {

  componentDidMount() {
    this.renderer = PIXI.autoDetectRenderer(800, 600, { antialias: true })
    this.refs.sceneCanvas.appendChild(this.renderer.view)

    this.stage = new PIXI.Container()
    this.stage.width = window.width
    this.stage.height = window.height

    this.graphics = new PIXI.Graphics()

    this.stage.addChild(this.graphics)

    this.animate()
  }

  constructor( props ) {
    super(props)
    this.animate = this.animate.bind(this)
  }

  animate() {

    var color = this.props.midiState.get(60) ? 0xFF0000 : 0xFFFFFF
    this.graphics.lineStyle(0)
    this.graphics.beginFill(color, 0.5)
    this.graphics.drawCircle(200,200,40)
    this.graphics.endFill()

    this.renderer.render(this.stage)
    this.frame = requestAnimationFrame(this.animate)
  }

  render () {
    return (
      <div className="scene-wrapper" ref="sceneCanvas">
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  control: state.control
})
export default connect(mapStateToProps, {
  control: control
})(Grid)
