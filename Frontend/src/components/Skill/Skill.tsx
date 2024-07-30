"use client";
import React from "react";
import { skills } from "../../helpers/skills";
import { motion } from "framer-motion";
import { FaCode, FaDatabase, FaServer, FaPalette, FaTools, FaBrain } from "react-icons/fa";

const iconMap: { [key: string]: any} = {
  "Frontend": FaCode,
  "Backend": FaServer,
  "Database": FaDatabase,
  "Design": FaPalette,
  "Tools": FaTools,
  "Soft Skills": FaBrain,
  
};

const Skills: React.FC = () => {
  return (
    <div className="p-8  min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((skill, index) => {
          const Icon = iconMap[skill.title] || FaCode;
          return (
            <motion.div
              key={skill.title}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center mb-4">
                <Icon className="text-3xl text-blue-500 mr-3" />
                <h3 className="text-2xl font-semibold text-gray-800">{skill.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{skill.description}</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <motion.div 
                  className="bg-blue-600 h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </div>
              <p className="text-right text-sm text-gray-500 mt-1">{skill.level}%</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;