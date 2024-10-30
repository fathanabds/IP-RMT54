import { useState } from 'react';
import model from '../helpers/geminiAi';

export default function SpoonAi() {
  const [form, setForm] = useState({
    age: '',
    dailyAct: 'Light',
    bodyHeight: '',
    currWeight: '',
    targetWeight: '',
    dailyMeal: '',
    dailyServ: '',
    deadline: '',
  });

  const [aiResult, setAiResult] = useState('');

  function handleInput(e) {
    setForm((prevForm) => {
      return {
        ...prevForm,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleReset() {
    setAiResult('');
    setForm({
      age: '',
      dailyAct: 'Light',
      bodyHeight: '',
      currWeight: '',
      targetWeight: '',
      dailyMeal: '',
      dailyServ: '',
      deadline: '',
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const prompt = `Help me calculate my approximate minimum and maximum calorie needs per meal served. Age: ${form.age} years old. Height: ${form.bodyHeight} cm Activity intensity: ${form.dailyAct}. Current weight: ${form.currWeight} kg. Target weight: ${form.targetWeight} kg. Target: ${form.deadline} months. Meal frequency per day: ${form.dailyMeal} times. Number of servings per meal: ${form.dailyMeal}. Give short, clear and concise answers in the format: Minimum: xxx | Maximum : xxx (calories per serve)`;

    const result = await model.generateContent(prompt);
    setAiResult(result.response.text());
  }

  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="container mx-auto py-3 border rounded my-3 w-75">
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label className="form-label">Age</label>
                <div className="input-group mb-3">
                  <input onChange={handleInput} value={form.age} name="age" type="number" className="form-control" placeholder="Pro tip: current year (minus) your birth year" />
                  <span className="input-group-text">Years old</span>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label className="form-label">Daily activity intensity</label>
                <select onChange={handleInput} value={form.dailyAct} name="dailyAct" className="form-select" id="inputGroupSelect01">
                  <option value="Light">Light</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Heavy">Heavy</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label className="form-label">Body height</label>
                <div className="input-group mb-3">
                  <input onChange={handleInput} value={form.bodyHeight} name="bodyHeight" type="number" className="form-control" placeholder="Your body height in centimetres" />
                  <span className="input-group-text">cm</span>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label className="form-label">Body weight</label>
                <div className="input-group">
                  <input onChange={handleInput} value={form.currWeight} name="currWeight" type="number" className="form-control" placeholder="Current weight (kg)" />
                  <span className="input-group-text">to</span>
                  <input onChange={handleInput} value={form.targetWeight} name="targetWeight" type="number" className="form-control" placeholder="Target weight (kg)" />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label className="form-label">Daily meal frequency</label>
                <div className="input-group mb-3">
                  <input onChange={handleInput} value={form.dailyMeal} name="dailyMeal" type="number" className="form-control" placeholder="1 or 2 or more?" />
                  <span className="input-group-text">Time(s)</span>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label className="form-label">Menus per meal</label>
                <div className="input-group mb-3">
                  <input onChange={handleInput} value={form.dailyServ} name="dailyServ" type="number" className="form-control" placeholder="1 or 2 or more?" />
                  <span className="input-group-text">Serving(s)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label className="form-label">
                  {' '}
                  <span className="text-primary">Last but not least:</span> When do you want to reach your target?
                </label>
                <div className="input-group mb-3">
                  <span className="input-group-text">In</span>
                  <input onChange={handleInput} value={form.deadline} name="deadline" type="number" className="form-control" placeholder="Cheer up! It's always about time. My recommendation? Max 0.5--1kg per month" />
                  <span className="input-group-text">Month(s)</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button type="submit" className="btn btn-primary w-100">
              Calculate My Calorie Needs
            </button>
            <button onClick={handleReset} type="button" className="btn btn-warning w-100 mt-2">
              Reset Form
            </button>
          </div>
        </div>
      </form>

      <div className="container mx-auto border rounded my-3 w-75">
        <p className="text-center my-2">{aiResult}</p>
      </div>
    </>
  );
}
