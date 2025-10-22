import Cards from "@/components/Cards";
import Calender from "@/components/Calender";
import Announcements from "@/components/Announcements";
import PieeChart from "@/components/PieeChart";
import BaarChart from "@/components/BaarChart";
import LineeChart from "@/components/LineeChart";

const Dashboard = () => {
  return (
    <section className="flex flex-col md:flex-row min-h-screen bg-gray-100 pt-[75px]">
      <div className="w-full md:w-1/2 lg:w-[70%] px-4">
        <Cards />

        <div className="flex justify-between flex-col lg:flex-row flex-wrap w-full mt-3">
          <PieeChart />
          <BaarChart />

          <LineeChart />
        </div>
      </div>

      <div className="w-full md:w-1/2 lg:w-[30%]">
        <Calender />
        <Announcements />
      </div>
    </section>
  );
};

export default Dashboard;
