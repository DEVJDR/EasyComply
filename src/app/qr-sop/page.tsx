"use client";

import React, { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { supabase } from "../../lib/supabase"

type ChecklistItem = { id: string; en: string; hi?: string };
type Checklist = {
  preOp: ChecklistItem[];
  op: ChecklistItem[];
  postOp: ChecklistItem[];
  safety: ChecklistItem[];
};
type Machine = {
  id: string;
  name: string;
  location?: string;
  video_url?: string;
  checklist: Checklist;
   isLocked?: boolean; 
};

export default function App() {
  const [view, setView] = useState<"list" | "train" | "done">("list");
  const [machines, setMachines] = useState<Machine[]>([]);
  const [activeMachine, setActiveMachine] = useState<Machine | null>(null);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [worker, setWorker] = useState("");
  const [supervisor, setSupervisor] = useState("");
    const [lang, setLang] = useState<"en" | "hin">("en");

  const sources = {
    en: "https://res.cloudinary.com/drygb9yrf/video/upload/v1756170249/wave-en_bnqktu.mp4",
    hin: "https://res.cloudinary.com/drygb9yrf/video/upload/v1756170249/wave-hin_gabi3k.mp4",
  };
const fallbackMachines: Machine[] = [
  {
    id: "wave_solder_e400",
    name: "Wave Soldering – E400",
    location: "Line A",
    video_url: "https://res.cloudinary.com/drygb9yrf/video/upload/v1756170249/wave-en_bnqktu.mp4",
    checklist: {
      preOp: [{ id: "esd", en: "Wear ESD wrist strap & connect to ground" }],
      op: [{ id: "align", en: "PCB aligned and seated in pallet" }],
      postOp: [{ id: "inspect", en: "Inspect sample board for solder quality" }],
      safety: [{ id: "estop", en: "Know Emergency Stop (E-Stop) location" }],
    },
    isLocked: false, // live
  },
  {
    id: "reflow_r300",
    name: "Reflow Oven – R300",
    location: "Line B",
    checklist: { preOp: [], op: [], postOp: [], safety: [] },
    isLocked: true, // locked
  },
  {
    id: "aoi_inspector_x200",
    name: "AOI Inspector – X200",
    location: "Line C",
    checklist: { preOp: [], op: [], postOp: [], safety: [] },
    isLocked: true, // locked
  },
   {
    id: "teknodome_pcb_assembler_100",
    name: "PCB Assembler – Model 100",
    location: "Line D",
    video_url: "https://res.cloudinary.com/drygb9yrf/video/upload/v1756170249/pcb-en.mp4",
    checklist: {
      preOp: [{ id: "power", en: "Check power supply connection" }],
      op: [{ id: "align", en: "Align PCB components" }],
      postOp: [{ id: "test", en: "Test circuit continuity" }],
      safety: [{ id: "gloves", en: "Wear anti-static gloves" }],
    },
    isLocked: true, // locked
  },
  {
    id: "cubix_wave_solder_e500",
    name: "Wave Soldering – E500",
    location: "Line E",
    video_url: "https://res.cloudinary.com/drygb9yrf/video/upload/v1756170249/wave-en_bnqktu.mp4",
    checklist: {
      preOp: [{ id: "esd", en: "Wear ESD wrist strap & connect to ground" }],
      op: [{ id: "temp", en: "Set solder temperature to 250°C" }],
      postOp: [{ id: "inspect", en: "Inspect solder joints" }],
      safety: [{ id: "estop", en: "Know Emergency Stop location" }],
    },
    isLocked: true, // locked
  },
  {
    id: "smtwise_smt_placer_300",
    name: "SMT Placer – Model 300",
    location: "Line F",
    video_url: "https://res.cloudinary.com/drygb9yrf/video/upload/v1756170249/smt-en.mp4",
    checklist: {
      preOp: [{ id: "calibrate", en: "Calibrate placement head" }],
      op: [{ id: "load", en: "Load SMT components" }],
      postOp: [{ id: "verify", en: "Verify placement accuracy" }],
      safety: [{ id: "guard", en: "Check safety guard" }],
    },
    isLocked: true, // locked
  },
  {
    id: "hbeonlabs_rfid_reader_200",
    name: "RFID Reader – Model 200",
    location: "Line B1",
    video_url: "https://res.cloudinary.com/drygb9yrf/video/upload/v1756170249/rfid-en.mp4",
    checklist: {
      preOp: [{ id: "connect", en: "Connect RFID antenna" }],
      op: [{ id: "scan", en: "Scan RFID tags" }],
      postOp: [{ id: "log", en: "Log scan results" }],
      safety: [{ id: "power", en: "Turn off power when idle" }],
    },
    isLocked: true, // locked
  },
  {
    id: "techno_automation_robot_400",
    name: "Automation Robot – Model 400",
    location: "Line A1",
    video_url: "https://res.cloudinary.com/drygb9yrf/video/upload/v1756170249/automation-en.mp4",
    checklist: {
      preOp: [{ id: "test", en: "Test motor functionality" }],
      op: [{ id: "run", en: "Run automation cycle" }],
      postOp: [{ id: "clean", en: "Clean robotic arm" }],
      safety: [{ id: "fence", en: "Check safety fence integrity" }],
    },
    isLocked: true, // locked
  },
];

  // Load machines from Supabase
 useEffect(() => {
  (async () => {
    const { data, error } = await supabase
      .from("machines")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: true });

    if (!error && data?.length) {
      const normalized = data.map((m: any, i: number) => ({
        id: m.id,
        name: m.name,
        location: m.location,
        video_url: m.video_url,
        checklist: m.checklist,
        isLocked: i === 0 ? false : true, // first machine live, rest locked
      }));
      setMachines(normalized);
      setActiveMachine(normalized[0]);
    } else {
      // fallback
      setMachines(fallbackMachines);
      setActiveMachine(fallbackMachines[0]);
    }
  })();
}, []);


  // Checklist stats
  const totalItems = useMemo(() => {
    if (!activeMachine) return 0;
    const c = activeMachine.checklist;
    return [...(c.preOp || []), ...(c.op || []), ...(c.postOp || []), ...(c.safety || [])].length;
  }, [activeMachine]);

  const checkedCount = useMemo(
    () => Object.values(checked).filter(Boolean).length,
    [checked]
  );
  const allChecked = totalItems > 0 && checkedCount === totalItems;

  // Start training
  const startTraining = (m: Machine) => {
    setActiveMachine(m);
    setChecked({});
    setWorker("");
    setSupervisor("");
    setView("train");
  };

  // Submit log
  const submitLog = async () => {
    if (!activeMachine) return;
    const payload = {
      machine_id: activeMachine.id,
      worker_name: worker,
      supervisor_initials: supervisor,
      checks: checked,
      shift: null,
      site_code: null,
    };
    const { error } = await supabase.from("training_logs").insert(payload);
    if (error) {
      alert("Failed to submit log: " + error.message);
      return;
    }
    setView("done");
  };

  // Fetch logs for export
  const fetchLogs = async () => {
    const { data, error } = await supabase
      .from("training_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) throw error;
    return data || [];
  };

  // Excel export
  const downloadExcel = async () => {
    const logs = await fetchLogs();
    if (!logs.length) return alert("No logs yet!");
    const worksheetData = logs.map((l: any) => ({
      Timestamp: l.created_at,
      MachineID: l.machine_id,
      Worker: l.worker_name,
      Supervisor: l.supervisor_initials,
      Checks: Object.entries(l.checks || {})
        .filter(([_, v]) => v)
        .map(([k]) => k)
        .join(", "),
      Shift: l.shift || "",
      Site: l.site_code || "",
    }));
    const ws = XLSX.utils.json_to_sheet(worksheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Logs");
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([buf], { type: "application/octet-stream" }),
      "qr-sop-logs.xlsx"
    );
  };

  // CSV export
  const downloadCSV = async () => {
    const logs = await fetchLogs();
    if (!logs.length) return alert("No logs yet!");
    const header = [
      "Timestamp",
      "MachineID",
      "Worker",
      "Supervisor",
      "Checks",
      "Shift",
      "Site",
    ];
    const rows = logs.map((l: any) => [
      l.created_at,
      l.machine_id,
      l.worker_name,
      l.supervisor_initials,
      Object.entries(l.checks || {})
        .filter(([_, v]) => v)
        .map(([k]) => k)
        .join("|"),
      l.shift || "",
      l.site_code || "",
    ]);
    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "qr-sop-logs.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Checklist UI
  const Section = ({ title, items }: { title: string; items: ChecklistItem[] }) => (
    <div className="bg-slate-50 rounded-xl p-4 mb-3 shadow-sm border border-slate-200">
      <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
      <ul className="space-y-3">
        {items?.map((it) => (
          <li key={it.id} className="flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1 h-5 w-5  rounded border-slate-400 accent-blue-700"
              checked={!!checked[it.id]}
              onChange={(e) =>
                setChecked((s) => ({ ...s, [it.id]: e.target.checked }))
              }
            />
            <div>
              <p className="text-slate-900 text-sm font-medium">{it.en}</p>
              {it.hi && <p className="text-slate-600 text-xs">{it.hi}</p>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="max-w-md mx-auto p-4">
        {/* List view */}
        {view === "list" && (
          <div>
            <header className="mb-4 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">
                  Machine Training Dashboard
                </h1>
                <p className="text-slate-600 text-sm mt-1">
                  Select a machine to begin.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={downloadCSV}
                  className="rounded-lg bg-green-700 hover:bg-green-800 text-white text-xs px-3 py-2 shadow"
                >
                  CSV
                </button>
                <button
                  onClick={downloadExcel}
                  className="rounded-lg bg-indigo-700 hover:bg-indigo-800 text-white text-xs px-3 py-2 shadow"
                >
                  Excel
                </button>
              </div>
            </header>
            <div className="space-y-3">
   {machines.map((m) => (
  <button
    key={m.id}
    onClick={() => !m.isLocked && startTraining(m)}
    className={`w-full text-left rounded-xl p-4 shadow border flex justify-between items-center ${
      m.isLocked ? "bg-slate-200 cursor-not-allowed" : "bg-white hover:shadow-md"
    }`}
  >
    <div>
      <div className="font-semibold text-slate-900">{m.name}</div>
      <div className="text-xs text-slate-600">{m.location}</div>
    </div>
    {m.isLocked ? (
      <span className="text-xs px-2 py-1 rounded-full bg-gray-300 text-gray-700 font-medium">
        Coming Soon
      </span>
    ) : (
      <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 font-medium">
        Start
      </span>
    )}
  </button>
))}


            </div>
          </div>
        )}

        {/* Training view */}
        {view === "train" && activeMachine && (
          <div>
            <header className="flex items-center justify-between mb-3">
              <button
                onClick={() => setView("list")}
                className="text-sm text-slate-600"
              >
                ✕
              </button>
              <div className="text-right">
                <div className="text-sm font-semibold text-slate-900">
                  {activeMachine.name}
                </div>
                <div className="text-xs text-slate-600">
                  {new Date().toLocaleString()}
                </div>
              </div>
            </header>
 <div className="flex p-2 justify-end">
      <div className="inline-flex rounded-lg  overflow-hidden border border-gray-300 bg-white dark:bg-gray-800">
        <button
          onClick={() => setLang("en")}
          className={`px-2 py-2 text-sm font-medium transition ${
            lang === "en"
              ? "bg-brand text-white"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          English
        </button>
        <button
          onClick={() => setLang("hin")}
          className={`px-2 py-2 text-sm font-medium transition ${
            lang === "hin"
              ? "bg-brand text-white"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          हिंदी
        </button>
      </div>
    </div>
            <div className="rounded-xl overflow-hidden mb-3 ">
  <div className="w-full">
    {/* Toggle Buttons */}
   

    {/* Video Player */}
    <video
      key={lang}
      controls
     
    >
      <source src={sources[lang]} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</div>

            <Section

              title="Pre-Operation / प्रारंभिक जाँच"
              items={activeMachine.checklist.preOp}
            />
            <Section
              title="Operation / संचालन"
              items={activeMachine.checklist.op}
            />
            <Section
              title="Post-Operation / पश्चात"
              items={activeMachine.checklist.postOp}
            />
            <Section
              title="Safety / सुरक्षा"
              items={activeMachine.checklist.safety}
            />

            <div className="bg-white rounded-xl p-4 shadow mb-28 border border-slate-200">
              <h3 className="font-semibold mb-3 text-slate-900">
                Worker Sign-off
              </h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Worker Name / ID"
                  value={worker}
                  onChange={(e) => setWorker(e.target.value)}
                  className="w-full rounded-lg bg-white border border-slate-400 px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  placeholder="Supervisor Initials"
                  value={supervisor}
                  onChange={(e) => setSupervisor(e.target.value)}
                  className="w-full rounded-lg border bg-white border-slate-400 px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="fixed left-0 right-0 bottom-0 max-w-md mx-auto p-4 bg-gradient-to-t from-slate-100">
              <button
                onClick={submitLog}
                disabled={!allChecked || !worker || !supervisor}
                className={`w-full rounded-xl px-4 py-3 text-white font-semibold shadow transition
                ${
                  !allChecked || !worker || !supervisor
                    ? "bg-slate-400"
                    : "bg-blue-700 hover:bg-blue-800"
                }`}
              >
                {allChecked
                  ? `Submit & Finish (${checkedCount}/${totalItems})`
                  : `Complete Checklist (${checkedCount}/${totalItems})`}
              </button>
            </div>
          </div>
        )}

        {/* Done view */}
        {view === "done" && activeMachine && (
          <div className="h-[70vh] flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl font-extrabold mb-2 text-slate-900">
              Training Completed!
            </h2>
            <p className="text-slate-700 mb-6">
              Well done, {worker || "Operator"}. Log saved for{" "}
              {activeMachine.name}.
            </p>
            <button
              onClick={() => setView("list")}
              className="rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2 shadow"
            >
              Back to Machines
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
