"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {ArrowLeft,Clock3,Flame,Star} from "lucide-react";
import {getWorkouts} from "@/lib/api";
import {Workout} from "@/lib/types";
import DetailActions from "@/components/DetailActions";
import Loading from "@/components/Loading";
export default function WorkoutDetailsPage(){
  const [workout,setWorkout]=useState<Workout|null>(null);
  const [loading,setLoading]=useState(true);
  const [notFound,setNotFound]=useState(false);
  useEffect(()=>{
    async function loadWorkout(){
      const id=new URLSearchParams(window.location.search).get("id");
      if(!id){
        setNotFound(true);
        setLoading(false);
        return;
      }
      try{
        const workouts=await getWorkouts();
        const selected=workouts.find((item)=>item.id===id);
        if(selected){
          setWorkout(selected);
        }else{
          setNotFound(true);
        }
      }catch{
        setNotFound(true);
      }finally{
        setLoading(false);
      }
    }
    loadWorkout();
  },[]);
  if(loading){
    return(
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <Loading/>
      </section>
    );
  }
  if(notFound||!workout){
    return(
      <section className="mx-auto flex min-h-[65vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
        <p className="text-sm font-black tracking-[0.3em] text-accent">404</p>
        <h1 className="mt-3 font-display text-5xl sm:text-7xl">WORKOUT NOT FOUND</h1>
        <p className="mt-4 max-w-md text-sm leading-6 text-zinc-500">This workout could not be loaded. Return to the library and choose a workout again.</p>
        <Link href="/" className="mt-8 flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-black text-black"><ArrowLeft size={17}/>Go to workouts</Link>
      </section>
    );
  }
  return(
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-white"><ArrowLeft size={17}/>Back to workouts</Link>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-line bg-panel">
          <img src={workout.image} alt={workout.name} className="h-full min-h-[420px] w-full object-cover"/>
        </div>
        <div>
          <p className="text-xs font-black tracking-[0.3em] text-accent">WORKOUT DETAILS</p>
          <h1 className="mt-3 font-display text-4xl leading-none sm:text-6xl">{workout.name}</h1>
          <p className="mt-5 max-w-2xl leading-7 text-zinc-400">{workout.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {workout.category.map((tag)=>(
              <span key={tag} className="rounded-full border border-line bg-panel px-3 py-1 text-xs font-bold">{tag}</span>
            ))}
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-line">
            {[["EQUIPMENT",workout.equipment],["DIFFICULTY",workout.difficulty],["SETS",workout.sets],["REPS",workout.reps],["DURATION",`${workout.duration} min`],["CALORIES",`${workout.calories} kcal`],["RATING",workout.rating],].map(([label,value])=>(
              <div key={String(label)} className="flex justify-between gap-4 border-b border-line px-4 py-3 text-sm last:border-b-0">
                <span className="text-zinc-500">{label}</span>
                <span className="text-right font-bold">{value}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-line bg-panel p-3">
              <Clock3 size={17} className="text-accent"/>
              <p className="mt-2 text-xs text-zinc-500">Duration</p>
              <p className="font-bold">{workout.duration} min</p>
            </div>
            <div className="rounded-xl border border-line bg-panel p-3">
              <Flame size={17} className="text-accent"/>
              <p className="mt-2 text-xs text-zinc-500">Calories</p>
              <p className="font-bold">{workout.calories}</p>
            </div>
            <div className="rounded-xl border border-line bg-panel p-3">
              <Star size={17} className="text-accent"/>
              <p className="mt-2 text-xs text-zinc-500">Rating</p>
              <p className="font-bold">{workout.rating}</p>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="font-display text-2xl">INSTRUCTIONS</h2>
            <ol className="mt-4 space-y-3">
              {workout.instructions.slice(0, 4).map((step,index)=>(
                <li key={step} className="flex gap-3 text-sm leading-6 text-zinc-400">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-xs font-black text-black">{index+1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <DetailActions workout={workout}/>
        </div>
      </div>
    </section>
  );
}
