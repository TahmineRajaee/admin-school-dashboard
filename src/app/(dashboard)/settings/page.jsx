"use client";

import React, { useState, useEffect } from "react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState(0);
  const [settings, setSettings] = useState({
    schoolName: "Daanesh",
    address: "No. 7, Yas Alley, Ghaisar Aminpour Boulevard.",
    phone: "02199887766",
    academicYear: "2025-2026",
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    backupFrequency: "weekly",
  });

  const [saveStatus, setSaveStatus] = useState("");

  const handleInputChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNotificationChange = (type, checked) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: checked,
      },
    }));
  };

  const handleSaveSettings = () => {
    setSaveStatus("success");
    setTimeout(() => setSaveStatus(""), 3000);
  };

  const handleBackupNow = () => {
    alert("Backup process started (simulated)");
  };

  const tabs = ["General", "Profile", "Notifications", "Backup", "About"];

  return (
    <div className="w-[98%] mx-auto bg-white rounded-lg shadow mt-[75px] px-3 py-5">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>

      {saveStatus === "success" && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Settings saved successfully!
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`mr-2 py-2 px-4 text-sm font-medium cursor-pointer ${
                activeTab === index
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* General Settings Tab */}
      {activeTab === 0 && (
        <div className="p-6">
          <div className="bg-white rounded-lg shadow p-6 mb-4">
            <h3 className="text-lg font-medium mb-4">School Information</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                School Name
              </label>
              <input
                type="text"
                value={settings.schoolName}
                onChange={(e) =>
                  handleInputChange("schoolName", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                value={settings.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Academic Year
              </label>
              <input
                type="text"
                value={settings.academicYear}
                onChange={(e) =>
                  handleInputChange("academicYear", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      )}

      {/* User Profile Tab */}
      {activeTab === 1 && (
        <div className="p-6">
          <div className="bg-white rounded-lg shadow p-6 mb-4">
            <h3 className="text-lg font-medium mb-4">User Profile</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="Admin User"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                defaultValue="admin@daanesh.edu"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Access Level
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="admin">Administrator</option>
                <option value="teacher">Teacher</option>
                <option value="viewer">View Only</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 2 && (
        <div className="p-6">
          <div className="bg-white rounded-lg shadow p-6 mb-4">
            <h3 className="text-lg font-medium mb-4">
              Notification Preferences
            </h3>
            <div className="flex items-center mb-3">
              <input
                type="checkbox"
                id="email-notifications"
                checked={settings.notifications.email}
                onChange={(e) =>
                  handleNotificationChange("email", e.target.checked)
                }
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label
                htmlFor="email-notifications"
                className="ml-2 text-sm text-gray-700"
              >
                Email Notifications
              </label>
            </div>
            <div className="flex items-center mb-3">
              <input
                type="checkbox"
                id="sms-notifications"
                checked={settings.notifications.sms}
                onChange={(e) =>
                  handleNotificationChange("sms", e.target.checked)
                }
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label
                htmlFor="sms-notifications"
                className="ml-2 text-sm text-gray-700"
              >
                SMS Notifications
              </label>
            </div>
            <div className="flex items-center mb-3">
              <input
                type="checkbox"
                id="push-notifications"
                checked={settings.notifications.push}
                onChange={(e) =>
                  handleNotificationChange("push", e.target.checked)
                }
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label
                htmlFor="push-notifications"
                className="ml-2 text-sm text-gray-700"
              >
                Push Notifications
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Backup Tab */}
      {activeTab === 3 && (
        <div className="p-6">
          <div className="bg-white rounded-lg shadow p-6 mb-4">
            <h3 className="text-lg font-medium mb-4">Backup Settings</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Backup Frequency
              </label>
              <select
                value={settings.backupFrequency}
                onChange={(e) =>
                  handleInputChange("backupFrequency", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <button
              onClick={handleBackupNow}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Create Backup Now
            </button>
          </div>
        </div>
      )}

      {/* About Tab */}
      {activeTab === 4 && (
        <div className="p-6">
          <div className="bg-white rounded-lg shadow p-6 mb-4">
            <h3 className="text-lg font-medium mb-4">
              About School Management System
            </h3>
            <p className="mb-2">Version: 1.0.0</p>
            <p className="mb-2">Developed for Daanesh School</p>
            <p className="mb-4">
              © 2023 School Management System. All rights reserved.
            </p>
            <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50">
              Check for Updates
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 px-6">
        <button
          onClick={handleSaveSettings}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
        >
          Save All Settings
        </button>
      </div>
    </div>
  );
}
