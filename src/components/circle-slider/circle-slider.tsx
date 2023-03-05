import { gsap } from "gsap";
import '../../styles/blocks/circle.scss';
import {useCallback, useRef, useState} from 'react';
import { elements } from "../mocks/elements"; 
import CountUp from 'react-countup';

import { Navigation } from "swiper";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Slide } from "../types/element";

function CircleSlider (){

	let minStart = elements[0].slides.reduce((acc, curr) => acc.age < curr.age ? acc : curr).age;
	let maxStart = elements[0].slides.reduce((acc, curr) => acc.age > curr.age ? acc : curr).age;

	const [hoveredCart, setHoveredCart] = useState(-1);
	const [activeType, setActiveType] = useState(0);
	const [activeTypeName, setActiveTypeName] = useState(elements[0].type);
	const [initActiveType, setInitActiveType] = useState(1);
	const [activeElement, setActiveElement] = useState(0);
	const [prevStartCount, setPrevStartCount] = useState(minStart);
	const [prevEndCount, setPrevEndCount] = useState(minStart);
	const [nextStartCount, setNextStartCount] = useState(maxStart);
	const [nextEndCount, setNextEndCount] = useState(maxStart);
	const [prevCurrent, setPrevCurrent] = useState(minStart);
	const [nextCurrent, setNextCurrent] = useState(maxStart);
	const [list, setList] = useState(elements[0].slides);
	const [listInCb, setListInCb] = useState(list);
	const typeNameELement = useRef<HTMLParagraphElement>(null);
	const listRef = useRef<any>(null);
	const swiperRef = useRef<SwiperRef | any>(null);
	const swiperWrapperRef = useRef<any>(null);
	const circleRef = useRef<any>(null);
	let itemEls:any = [];
	let btnEls:any = [];

	

	function setTab(idx:number) {
		let pos = 0 - idx * 60;
		
		btnEls.map((el:HTMLDivElement) => {
			gsap.to(el, {
				rotation: Math.abs(pos),
				ease:"none",
				delay: 0.1,
			});
			return true
		});

		gsap.to(circleRef.current, {
			rotation: pos,
			ease: "none",
			delay: 0.1,
		});

	}

	const showCartHandler = (idx:number)=>{
			 setHoveredCart(idx);
	}
	
	const hideCartHandler=()=>{
				 setHoveredCart(-1)
	}

	const showActiveType = (idx:number)=>{
		setActiveType(idx);
		setInitActiveType(idx + 1)
	}


  const setListAndRef = (l:Slide[]) => {
		swiperWrapperRef.current.classList.add('hide');
		setTimeout(() => {
			swiperRef.current.swiper.slideTo(0);
			swiperWrapperRef.current.classList.add('transMobile');
		}, 500)
		setTimeout(() => {
			setList(l);
			listRef.current = l;
			swiperWrapperRef.current.classList.remove('hide');
			swiperWrapperRef.current.classList.remove('transMobile');
		}, 1000)
  };

  const onSlideChange = useCallback(() => {
    setListInCb(listRef.current);
  }, []);

  const swiperItems = list.map((li, idx) => (
    <SwiperSlide key={idx}>{
			<>
				<span>{li.age}</span>
				<p>{li.text}</p>
			</>
		}</SwiperSlide>
  ));

	return (
		<>
			<div className="circle">
				<div className="circle__wrapper">
					<CountUp className="circle__date circle__date--start" start={prevStartCount} end={prevEndCount} duration={1} />
					<CountUp className="circle__date circle__date--end" start={nextStartCount} end={nextEndCount} duration={1} />
					<div ref={circleRef} className="circle__slider">
						{
							elements.map((el, idx) => {
								return (
									<>
										{
											idx <= 5 ?  
												<div key={idx}  className={`circle__btn-wrapper circle__btn-wrapper--${idx + 1}  
												${hoveredCart === idx ? 'isHovered':''}
												${activeType === idx ? 'isShow':''}
												`} 
												ref={(element) => itemEls.push(element)}
												onMouseLeave={hideCartHandler}
												onMouseEnter={()=>showCartHandler(idx)}
												onClick={() => {

													setActiveElement(idx)
													showActiveType(idx)

													let minCurrent = el.slides.reduce((acc, curr) => acc.age < curr.age ? acc : curr);
													let maxCurrent = el.slides.reduce((acc, curr) => acc.age > curr.age ? acc : curr);

													setPrevCurrent(minCurrent.age)
													setNextCurrent(maxCurrent.age)

													setPrevStartCount(prevCurrent)
													setNextStartCount(nextCurrent)

													setPrevEndCount(minCurrent.age)
													setNextEndCount(maxCurrent.age)
			
													setListAndRef(elements[idx].slides)
												}}
												>
													<button id="circle-btn" 
													ref={(element) => btnEls.push(element)}  
													onClick={() => setTab(idx) } 
													className={`circle__btn circle__btn--${idx + 1} `}>
													<span>{el.id}</span>
													<p>{el.type}</p>
													</button>
												</div>
											: null
										}
									</>
								)
							})
						}
					</div>
				</div>
				<div className="circle__control">
						<div className="circle__control-wrapper">
							<p className="circle__pagination">
								<span>0{initActiveType}</span>/<span>0{elements.length > 6 ? 6 : elements.length}</span>
							</p>
							<div className="circle__navigation">
								<button className={`${activeElement + 1 <= 1 ? 'circle__prev disabled': 'circle__prev'}`}
										onClick={() => {
										itemEls[activeElement - 1].click()
										setTab(activeElement - 1)
										setTimeout(() => {
											setActiveTypeName(elements[activeElement - 1].type)
										}, 300)
										}}
								>
									<img src="img/icon-arrow.svg" alt="arrow icon" />
								</button>
								<button className={`${activeElement + 1 >= (elements.length >= 6 ? 6 : elements.length)  ? 'circle__next disabled': 'circle__next'}`}
								onClick={() => {
									itemEls[activeElement + 1].click()
									setTab(activeElement + 1)			
									setTimeout(() => {
										setActiveTypeName(elements[activeElement + 1].type)
									}, 300)
								}}
								>
									<img src="img/icon-arrow.svg" alt="arrow icon" />
								</button>
							</div>
						</div>
						<div className="circle__dots circle__dots--mobile">
						{
							elements.map((el, idx) => {
								return (
									<>
										{
											idx <= 5 ?  
												<button className={`circle__dots-btn circle__dots-btn--${idx + 1}
												${activeType === idx ? 'isShow':''}
												`} key={idx} 
												ref={(element) => itemEls.push(element)}
												onMouseLeave={hideCartHandler}
												onMouseEnter={()=>showCartHandler(idx)}
												onClick={() => {

													setActiveElement(idx)
													showActiveType(idx)

													let minCurrent = el.slides.reduce((acc, curr) => acc.age < curr.age ? acc : curr);
													let maxCurrent = el.slides.reduce((acc, curr) => acc.age > curr.age ? acc : curr);

													setPrevCurrent(minCurrent.age)
													setNextCurrent(maxCurrent.age)

													setPrevStartCount(prevCurrent)
													setNextStartCount(nextCurrent)

													setPrevEndCount(minCurrent.age)
													setNextEndCount(maxCurrent.age)
			
													setListAndRef(elements[idx].slides)

													setTimeout(() => {
														setActiveTypeName(elements[idx].type)
													}, 300)
												}}
												>
												</button>
											: null
										}
									</>
								)
							})
						}
						</div>
				</div>
					<div className="circle__swiper-wrapper" ref={swiperWrapperRef}>
						<p className="circle__swiper-type" ref={typeNameELement}>{activeTypeName}</p>
						<Swiper className="circle__swiper"
						ref={swiperRef}
						modules={[Navigation]}
						navigation
						onSlideChange={() => {
							onSlideChange()
						}}
						breakpoints={{
							0: {
								slidesPerView: 1.6,
								spaceBetween: 25,
								centeredSlides: true,
								centeredSlidesBounds: true,
							},
							440: {
								slidesPerView: 2,
								spaceBetween: 25,
								centeredSlides: false,
								centeredSlidesBounds: false,
							},
							768: {
								slidesPerView: 2,
								spaceBetween: 50,
								centeredSlides: false,
								centeredSlidesBounds: false,
							},
							920: {
								slidesPerView: 2,
								spaceBetween: 50,
								centeredSlides: false,
								centeredSlidesBounds: false,
							},
							1366: {
								slidesPerView: 3,
								spaceBetween: 50,
								centeredSlides: false,
								centeredSlidesBounds: false,
							},
							1920: {
								slidesPerView: 3,
								spaceBetween: 80,
								centeredSlides: false,
								centeredSlidesBounds: false,
							},
						}}
					>
						{swiperItems}
					</Swiper>
					</div>
			</div>
		</>
	)
}

export default CircleSlider;