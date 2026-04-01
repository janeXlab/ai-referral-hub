"use client";

import { useState, type ReactNode } from "react";

type Mode = "existing" | "new";

export type SubmitModeToggleProps = {
  /** 标题：你要如何提交 */
  label: string;
  /** 说明小字 */
  helper: string;
  /** 已有产品按钮文案 */
  existingLabel: string;
  /** 新产品按钮文案 */
  newLabel: string;
  /** 选择已有产品时渲染 */
  existingSlot: ReactNode;
  /** 补充新产品时渲染 */
  newSlot: ReactNode;
};

/**
 * 提交页「已有产品 / 新产品」切换。
 * 使用客户端状态，避免纯 CSS peer 在复杂 DOM 结构下失效。
 */
export function SubmitModeToggle({
  label,
  helper,
  existingLabel,
  newLabel,
  existingSlot,
  newSlot,
}: SubmitModeToggleProps) {
  const [mode, setMode] = useState<Mode>("existing");

  const baseBtn =
    "w-full cursor-pointer rounded-xl border px-4 py-3 text-sm transition-all text-left";
  const activeStyle = { borderColor: "var(--accent)" as const };
  const idleStyle = {
    background: "var(--bg-secondary)",
    borderColor: "var(--border-color)",
  };

  return (
    <div className="grid gap-3">
      <span className="text-sm font-medium">{label}</span>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          className={baseBtn}
          style={mode === "existing" ? { ...idleStyle, ...activeStyle } : idleStyle}
          onClick={() => setMode("existing")}
        >
          {existingLabel}
        </button>
        <button
          type="button"
          className={baseBtn}
          style={mode === "new" ? { ...idleStyle, ...activeStyle } : idleStyle}
          onClick={() => setMode("new")}
        >
          {newLabel}
        </button>
      </div>

      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
        {helper}
      </p>

      {mode === "existing" ? existingSlot : newSlot}
    </div>
  );
}
