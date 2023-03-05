import CircleSlider from "../circle-slider/circle-slider";

function App(): JSX.Element {
  return (
		<section className="historical-dates">
			<div className="historical-dates__wrapper">
				<h1>Исторические даты</h1>
				<div className="historical-dates__content">
					<CircleSlider/>
				</div>
			</div>
		</section>
  );
}

export default App;