import React from 'react'
import ReactDOM from 'react-dom'

class Title extends React.Component{
	render(){
		let oLi = []
		this.props.topVal.forEach((val,index)=>{
			oLi.push(<li key={index} className={index==this.props.index?'active':''} onMouseOver={this.props.change.bind(null,index)}>{val}</li>)
		})
		return (<div className='topBox'>
					<ul>
						{oLi}
					</ul>
				</div>)
	}
}

export default Title;
