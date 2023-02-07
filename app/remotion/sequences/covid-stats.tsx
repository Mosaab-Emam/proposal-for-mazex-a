import type { Covid } from "app/lib/types";
import type { ChartConfiguration } from "chart.js/auto";
import { Sequence } from "remotion";
import { ChartComponent } from "../components/chart";
import { Title } from "../components/title";

export const CovidStats: React.FC<{ covid: Covid }> = ({ covid }) => {
  const bar_chart_config: ChartConfiguration = {
    type: 'bar',
    data: {
      labels: ["2020", "2021", "2022", "2023"],
      datasets: [
        {
          label: 'الحالات المؤكدة',
          data: [
            covid['2020'].confirmed,
            covid['2021'].confirmed,
            covid['2022'].confirmed,
            covid['2023'].confirmed,
          ]
        },
        {
          label: 'نشطة',
          data: [
            covid['2020'].active,
            covid['2021'].active,
            covid['2022'].active,
            covid['2023'].active,
          ]
        },
        {
          label: 'وفيات',
          data: [
            covid['2020'].deaths,
            covid['2021'].deaths,
            covid['2022'].deaths,
            covid['2023'].deaths,
          ]
        },
        {
          label: 'متعافية',
          data: [
            covid['2020'].recovered,
            covid['2021'].recovered,
            covid['2022'].recovered,
            covid['2023'].recovered,
          ]
        },
      ]
    }
  }

  const pie_chart_config: ChartConfiguration = {
    type: 'pie',
    data: {
      labels: ["مؤكدة", "نشطة", "وفيات", "متعافية"],
      datasets: [
        {
          label: '2020 - 2023',
          data: [
            covid['2020'].confirmed + covid['2021'].confirmed + covid['2022'].confirmed + covid['2023'].confirmed,
            covid['2020'].active + covid['2021'].active + covid['2022'].active + covid['2023'].active,
            covid['2020'].deaths + covid['2021'].deaths + covid['2022'].deaths + covid['2023'].deaths,
            covid['2020'].recovered + covid['2021'].recovered + covid['2022'].recovered + covid['2023'].recovered,
          ]
        }
      ]
    }
  }

  return (
    <div id="charts">
      <Title titleText="الكورونا في السعودية" titleColor="white" />
      <Sequence durationInFrames={60} style={{ position: 'relative', height: '72%', justifyContent: "center" }}>
        <ChartComponent config={bar_chart_config} id="bar-chart" />
      </Sequence>
      <Sequence from={60} durationInFrames={60} style={{ position: 'relative', height: '72%', justifyContent: 'center' }}>
        <ChartComponent config={pie_chart_config} id="pie-chart" />
      </Sequence>
    </div>
  )
}